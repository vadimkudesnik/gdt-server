import { UpdateUserDTO } from './dto/update-user.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthMethod, User } from 'prisma/__generated__'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: id
			},
			include: {
				accounts: true
			}
		})

		if (!user) {
			throw new NotFoundException(
				'Пользователь не найден. Проверьте введенные данные.'
			)
		}

		return user
	}

	public async findByEmail(email: string): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			},
			include: {
				accounts: true
			}
		})

		return user
	}

	public async findByLogin(login: string): Promise<User> {
		const user = await this.prismaService.user.findUnique({
			where: {
				login
			},
			include: {
				accounts: true
			}
		})

		return user
	}

	public async create(
		login: string,
		email: string,
		password: string,
		name: string,
		surname: string,
		secondname: string,
		picture: string,
		method: AuthMethod,
		isVerified: boolean
	): Promise<User> {
		const user = await this.prismaService.user.create({
			data: {
				login,
				email,
				password: password ? await hash(password) : '',
				name,
				surname,
				secondname,
				picture,
				method,
				isVerified
			},
			include: {
				accounts: true
			}
		})
		return user
	}

	public async editVerified(
		email: string,
		method: AuthMethod,
		isVerified: boolean
	): Promise<User> {
		const user = await this.prismaService.user.update({
			where: {
				email: email
			},
			data: {
				method,
				isVerified
			},
			include: {
				accounts: true
			}
		})

		return user
	}

	public async update(userId: string, dto: UpdateUserDTO) {
		const user = await this.findById(userId)

		const updatedUser = await this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				login: dto.login,
				email: dto.email,
				name: dto.name,
				surname: dto.surname,
				secondname: dto.secondname,
				isTwoFactorEnabled: dto.isTwoFactorEnabled
			}
		})

		return updatedUser
	}
}
