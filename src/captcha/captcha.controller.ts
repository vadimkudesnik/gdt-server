import { CaptchaService } from './captcha.service'
import { TypeCaptcha } from './types/captcha.type'
import { TypeCaptchaValidate } from './types/validate.type'
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'

@Controller('captcha')
export class CaptchaController {
	constructor(private readonly captchaService: CaptchaService) {}

	@Get('generate')
	@HttpCode(HttpStatus.OK)
	public async generateCaptcha(): Promise<TypeCaptcha> {
		return this.captchaService.generateCaptcha()
	}

	@Get('validate')
	@HttpCode(HttpStatus.OK)
	public async validateCaptcha(
		@Query('answer') answer: string,
		@Query('token') token: string
	): Promise<TypeCaptchaValidate> {
		return this.captchaService.validateCaptcha(answer, token)
	}
}
