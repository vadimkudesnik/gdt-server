import { AuthService } from './auth.service'
import { LoginEmailDTO } from './dto/login-email.dto'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { Request, Response } from 'express'
import { User } from 'prisma/__generated__'

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.OK)
	public async register(
		@Req() request: Request,
		@Body() dto: RegisterDTO
	): Promise<User> {
		return this.authService.register(request, dto)
	}

	@Post('login_email')
	@HttpCode(HttpStatus.OK)
	public async loginEmail(
		@Req() request: Request,
		@Body() dto: LoginEmailDTO
	): Promise<User> {
		return this.authService.loginEmail(request, dto)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(
		@Req() request: Request,
		@Body() dto: LoginDTO
	): Promise<User> {
		return this.authService.login(request, dto)
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	): Promise<void> {
		return this.authService.logout(request, response)
	}
}
