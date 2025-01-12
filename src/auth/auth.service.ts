import { LoginEmailDTO } from './dto/login-email.dto'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'
import { UserService } from '@/user/user.service'
import {
	ConflictException,
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
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {}

	public async register(request: Request, dto: RegisterDTO) {
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

		return this.saveSession(request, newUser)
	}

	public async login(request: Request, dto: LoginDTO) {
		const user = await this.userService.findByLogin(dto.login)
		if (!user || !user.password) {
			throw new NotFoundException('Пользователь не найден.')
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный паорь.')
		}
		return this.saveSession(request, user)
	}

	public async loginEmail(request: Request, dto: LoginEmailDTO) {
		const user = await this.userService.findByEmail(dto.email)
		if (!user || !user.password) {
			throw new NotFoundException('Пользователь не найден.')
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Неверный пароль.')
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

	private async saveSession(request: Request, user: User) {
		return new Promise((resolve, reject) => {
			request.session.userId = user.id
			request.session.save(error => {
				if (error) {
					return reject(
						new InternalServerErrorException(
							'Не удалось сохранить сессию.'
						)
					)
				}
				resolve({ user })
			})
		})
	}
}
