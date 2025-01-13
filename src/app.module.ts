import { AuthModule } from './auth/auth.module'
import { CaptchaModule } from './captcha/captcha.module'
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util'
import { PrismaModule } from './prisma/prisma.module'
import { ProviderModule } from './provider/provider.module'
import { UserModule } from './user/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		PrismaModule,
		AuthModule,
		UserModule,
		ProviderModule,
		CaptchaModule
	]
})
export class AppModule {}
