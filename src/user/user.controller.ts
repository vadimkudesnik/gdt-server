import { UpdateUserDTO } from './dto/update-user.dto'
import { UserService } from './user.service'
import { Administration } from '@/auth/decorators/admin.decorator'
import { Authorization } from '@/auth/decorators/auth.decorator'
import { Athorized } from '@/auth/decorators/authorized.decorator'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch
} from '@nestjs/common'
import { User } from 'prisma/__generated__'

@Controller('users')
export class UserController {
	public constructor(private readonly userService: UserService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Athorized('id') userId: string): Promise<User> {
		return this.userService.findById(userId)
	}

	@Administration()
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async findById(@Param('id') id: string): Promise<User> {
		return this.userService.findById(id)
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Athorized('id') userId: string,
		@Body() dto: UpdateUserDTO
	): Promise<User> {
		return this.userService.update(userId, dto)
	}
}
