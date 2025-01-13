import { TypeCaptcha } from './types/captcha.type'
import { TypeCaptchaValidate } from './types/validate.type'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CaptchaService {
	public constructor(private readonly configService: ConfigService) {}

	protected async extractCaptchaData(data: any): Promise<TypeCaptcha> {
		return {
			...data
		}
	}

	protected async extractValidateData(
		data: any
	): Promise<TypeCaptchaValidate> {
		return {
			...data
		}
	}

	public async generateCaptcha(): Promise<TypeCaptcha> {
		const URL = await this.configService.getOrThrow<string>('CAPTCHA_URL')
		const captchaRequest = await fetch(`${URL}/generate`, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		})
		if (!captchaRequest) {
			throw new InternalServerErrorException(
				'Нет доступа к сервису генерации Captcha'
			)
		}
		const data = await captchaRequest.json()
		const CaptchaData = await this.extractCaptchaData(data)

		return CaptchaData
	}

	public async validateCaptcha(
		answer: string,
		token: string
	): Promise<TypeCaptchaValidate> {
		const URL = await this.configService.getOrThrow<string>('CAPTCHA_URL')
		const captchaRequest = await fetch(
			`${URL}/validate?answer=${answer}&token=${token}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			}
		)
		const data = await captchaRequest.json()
		const validateData = await this.extractValidateData(data)

		return validateData
	}
}
