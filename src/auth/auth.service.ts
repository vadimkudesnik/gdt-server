import { LoginEmailDTO } from './dto/login-email.dto'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service'
import { ProviderService } from './provider/provider.service'
import { parseBoolean } from '@/libs/common/utils/parse-boolean.util'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'
import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import { Request, Response } from 'express'
import { AuthMethod, User } from 'prisma/__generated__'

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly providerService: ProviderService,
		@Inject(forwardRef(() => EmailConfirmationService))
		private readonly emailConfirmationService: EmailConfirmationService
	) {}

	public async register(
		request: Request,
		dto: RegisterDTO
	): Promise<{
		message: string
	}> {
		const isExistEmail = await this.userService.findByEmail(dto.email)
		const isExistLogin = await this.userService.findByLogin(dto.login)

		if (isExistEmail) {
			throw new ConflictException(
				'Пользователь с данным email уже существует.'
			)
		}

		if (isExistLogin) {
			throw new ConflictException(
				'Пользователь с данным логином уже существует.'
			)
		}

		const newUser = await this.userService.create(
			dto.login,
			dto.email,
			dto.password,
			dto.name,
			dto.surname,
			dto.secondname,
			'',
			AuthMethod.CREDENTIAL,
			false
		)
		const enabledEmail = this.configService.getOrThrow<string>('MAIL')
		if (parseBoolean(enabledEmail)) {
			await this.emailConfirmationService.sendVerificationToken(newUser)

			return {
				message:
					'Пожалуйста подтвердите Ваш email или войдите в систему.'
			}
		}

		if (!parseBoolean(enabledEmail)) {
			return {
				message: 'Вы зарегестрированы. Войдите в систему.'
			}
		}
	}

	public async login(request: Request, dto: LoginDTO): Promise<User> {
		const user = await this.userService.findByLogin(dto.login)
		if (!user || !user.password) {
			throw new NotFoundException('Пользователь не найден.')
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный паорь.')
		}
		const enabledEmail = this.configService.getOrThrow<string>('MAIL')
		if (parseBoolean(enabledEmail)) {
			if (!user.isVerified) {
				await this.emailConfirmationService.sendVerificationToken(user)
				throw new UnauthorizedException(
					'Ваш email не подтвержден. Пожалуйста проверьте почту и подтвердите адрес.'
				)
			}
		}

		return this.saveSession(request, user)
	}

	public async loginEmail(
		request: Request,
		dto: LoginEmailDTO
	): Promise<User> {
		const user = await this.userService.findByEmail(dto.email)
		if (!user || !user.password) {
			throw new NotFoundException('Пользователь не найден.')
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный пароль.')
		}
		const enabledEmail = this.configService.getOrThrow<string>('MAIL')
		if (parseBoolean(enabledEmail)) {
			if (!user.isVerified) {
				await this.emailConfirmationService.sendVerificationToken(user)
				throw new UnauthorizedException(
					'Ваш email не подтвержден. Пожалуйста проверьте почту и подтвердите адрес.'
				)
			}
		}

		return this.saveSession(request, user)
	}

	public async extractProfileFromCode(
		request: Request,
		provider: string,
		code: string
	) {
		const providerInstance = this.providerService.findByService(provider)
		const profile = await providerInstance.findUserByCode(code)

		const account = await this.prismaService.account.findFirst({
			where: {
				id: profile.id,
				provider: profile.provider
			}
		})

		let user = account?.userId
			? await this.userService.findById(account.userId)
			: null

		if (user) {
			return this.saveSession(request, user)
		}

		const isExistEmail = await this.userService.findByEmail(profile.email)

		if (isExistEmail) {
			user = await this.userService.edit(
				profile.email,
				AuthMethod[profile.provider.toUpperCase()],
				true
			)

			if (!account) {
				await this.prismaService.account.create({
					data: {
						userId: user.id,
						type: 'oauth',
						provider: profile.provider,
						accessToken: profile.access_token,
						refreshToken: profile.refresh_token,
						expiresAt: profile.expires_at
					}
				})
			}

			return this.saveSession(request, user)
		}

		user = await this.userService.create(
			this.makeString(),
			profile.email,
			this.makeString(),
			profile.name,
			'',
			'',
			profile.picture,
			AuthMethod[profile.provider.toUpperCase()],
			true
		)

		if (!account) {
			await this.prismaService.account.create({
				data: {
					userId: user.id,
					type: 'oauth',
					provider: profile.provider,
					accessToken: profile.access_token,
					refreshToken: profile.refresh_token,
					expiresAt: profile.expires_at
				}
			})
		}

		return this.saveSession(request, user)
	}

	public async logout(request: Request, response: Response): Promise<void> {
		return new Promise((resolve, reject) => {
			request.session.destroy(error => {
				if (error) {
					return reject(
						new InternalServerErrorException(
							'Не удалось завершить сессию'
						)
					)
				}
				response.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME')
				)
				resolve()
			})
		})
	}

	public makeString(): string {
		let outString: string = ''
		const inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
		for (let i = 0; i < 8; i++) {
			outString += inOptions.charAt(
				Math.floor(Math.random() * inOptions.length)
			)
		}
		return outString
	}

	public async saveSession(request: Request, user: User): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			request.session.userId = user.id
			request.session.save(error => {
				if (error) {
					return reject(
						new InternalServerErrorException(
							'Не удалось сохранить сессию.'
						)
					)
				}
				resolve(user)
			})
		})
	}
}
