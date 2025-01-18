import { MailService } from '../../libs/mail/mail.service'
import { TwoFactorAuthService } from './two-factor-auth.service'
import { UserService } from '@/user/user.service'
import { Module } from '@nestjs/common'

@Module({
	providers: [TwoFactorAuthService, MailService, UserService]
})
export class TwoFactorAuthModule {}
