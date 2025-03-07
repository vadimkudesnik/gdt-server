import { CaptchaService } from '@/captcha/captcha.service'
import { PasswordRecoveryController } from './password-recovery.controller'
import { PasswordRecoveryService } from './password-recovery.service'
import { MailService } from '@/libs/mail/mail.service'
import { UserService } from '@/user/user.service'
import { Module } from '@nestjs/common'

@Module({
	controllers: [PasswordRecoveryController],
	providers: [
		PasswordRecoveryService,
		UserService,
		MailService,
		CaptchaService
	]
})
export class PasswordRecoveryModule {}
