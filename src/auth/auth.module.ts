import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserService } from '@/user/user.service'
import { Module } from '@nestjs/common'

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService]
})
export class AuthModule {}
