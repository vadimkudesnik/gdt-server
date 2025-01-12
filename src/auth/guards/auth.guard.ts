import { UserService } from '@/user/user.service'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly userService: UserService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		if (typeof request.session.userId === 'undefined') {
			throw new UnauthorizedException(
				'Требуется авторизация пользователя.'
			)
		}

		const user = await this.userService.findById(request.session.userId)
		if (!user) {
			throw new UnauthorizedException('Пользователь не найден в системе.')
		}
		request.user = user

		return true
	}
}
