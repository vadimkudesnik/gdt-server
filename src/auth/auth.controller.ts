import { AuthService } from './auth.service'
import { Authorization } from './decorators/auth.decorator'
import { Unauthorized } from './decorators/unauth.decorator'
import { LoginEmailDTO } from './dto/login-email.dto'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'
import { AuthProviderGuard } from './guards/provider.guard'
import { ProviderService } from './provider/provider.service'
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'
import { User } from 'prisma/__generated__'

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
		private readonly providerService: ProviderService
	) {}

	@Unauthorized()
	@Post('register')
	@HttpCode(HttpStatus.OK)
	public async register(
		@Req() request: Request,
		@Body() dto: RegisterDTO
	): Promise<{
		message: string
	}> {
		return this.authService.register(request, dto)
	}

	@Unauthorized()
	@Post('login_email')
	@HttpCode(HttpStatus.OK)
	public async loginEmail(
		@Req() request: Request,
		@Body() dto: LoginEmailDTO
	): Promise<User> {
		return this.authService.loginEmail(request, dto)
	}

	@Unauthorized()
	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(
		@Req() request: Request,
		@Body() dto: LoginDTO
	): Promise<User> {
		return this.authService.login(request, dto)
	}

	@Unauthorized()
	@UseGuards(AuthProviderGuard)
	@Get('/oauth/callback/:provider')
	@HttpCode(HttpStatus.OK)
	public async callback(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
		@Query('code') code: string,
		@Param('provider') provider: string
	) {
		if (!code) {
			throw new BadRequestException(
				'Не был предоставлен код авторизации.'
			)
		}

		await this.authService.extractProfileFromCode(request, provider, code)

		return response.redirect(
			`${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/dashboard/settings`
		)
	}

	@Unauthorized()
	@UseGuards(AuthProviderGuard)
	@Get('/oauth/connect/:provider')
	@HttpCode(HttpStatus.OK)
	public async connect(@Param('provider') provider: string) {
		const providerInstance = this.providerService.findByService(provider)

		return {
			url: providerInstance.getAuthUrl()
		}
	}

	@Authorization()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response
	): Promise<void> {
		return this.authService.logout(request, response)
	}
}
