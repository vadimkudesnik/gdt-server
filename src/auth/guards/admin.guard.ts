import { UserService } from '@/user/user.service'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class AdminGuard implements CanActivate {
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

		if (!user.isAdmin) {
			throw new ForbiddenException(
				'Доступ разрешен только для администраторов.'
			)
		}

		request.user = user

		return true
	}
}
