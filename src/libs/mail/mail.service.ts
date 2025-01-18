import { ConfirmationTemlate } from './templates/confirmation.template'
import { ResetPasswordTemplate } from './templates/reset.template'
import { TwoFatorAuthTemplate } from './templates/two-factor-auth.template'
import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

@Injectable()
export class MailService {
	public constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	public async sendConfirmationEmail(email: string, token: string) {
		const domain =
			await this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

		const html = await render(ConfirmationTemlate({ domain, token }))

		return this.sendMail(email, 'Подтвеждение почты GDT', html)
	}

	public async sendResetEmail(email: string, token: string) {
		const domain =
			await this.configService.getOrThrow<string>('ALLOWED_ORIGIN')

		const html = await render(ResetPasswordTemplate({ domain, token }))

		return this.sendMail(email, 'Сброс пароля GDT', html)
	}

	public async sendTwoFactoEmail(email: string, token: string) {
		const html = await render(TwoFatorAuthTemplate({ token }))

		return this.sendMail(email, 'Подтверждение личности', html)
	}

	private sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}
