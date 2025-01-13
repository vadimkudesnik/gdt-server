import { UserService } from './user.service'
import { Administration } from '@/auth/decorators/admin.decorator'
import { Authorization } from '@/auth/decorators/auth.decorator'
import { Athorized } from '@/auth/decorators/authorized.decorator'
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Athorized('id') userId: string) {
		return this.userService.findById(userId)
	}

	@Administration()
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async findById(@Param('id') id: string) {
		return this.userService.findById(id)
	}
}
