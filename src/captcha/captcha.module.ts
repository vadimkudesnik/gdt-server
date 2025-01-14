import { CaptchaController } from './captcha.controller'
import { CaptchaService } from './captcha.service'
import { Module } from '@nestjs/common'

@Module({
	controllers: [CaptchaController],
	providers: [CaptchaService]
})
export class CaptchaModule {}
