import { AuthModule } from '../auth.module'
import { EmailConfirmationController } from './email-confirmation.controller'
import { EmailConfirmationService } from './email-confirmation.service'
import { MailModule } from '@/libs/mail/mail.module'
import { MailService } from '@/libs/mail/mail.service'
import { UserService } from '@/user/user.service'
import { forwardRef, Module } from '@nestjs/common'

@Module({
	imports: [MailModule, forwardRef(() => AuthModule)],
	controllers: [EmailConfirmationController],
	providers: [EmailConfirmationService, MailService, UserService],
	exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
