import { isDev } from '@/libs/common/utils/is-dev.util'
import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export const getMailerConfig = async (
	configService: ConfigService
): Promise<MailerOptions> => ({
	transport: {
		host: configService.getOrThrow<string>('MAIL_HOST'),
		port: configService.getOrThrow<number>('MAIL_PORT'),
		secure: false,
		auth: {
			type: 'login',
			user: configService.getOrThrow<string>('MAIL_LOGIN'),
			pass: configService.getOrThrow<string>('MAIL_PASSWORD')
		},
		ignoreTLS: true,
		requireTLS: false,
		tls: {
			ciphers:'SSLv3'
		},

	},
	defaults: {
		from: `${configService.getOrThrow<string>('MAIL_LOGIN')}`
	}
})
