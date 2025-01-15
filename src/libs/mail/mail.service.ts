import { ConfirmationTemlate } from './template/confirmation.temlate'
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
			await this.configService.getOrThrow<string>('APPLICATION_URL')

		const html = await render(ConfirmationTemlate({ domain, token }))

		return this.sendMail(email, 'Подтвеждение почты GDT', html)
	}

	private sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}
