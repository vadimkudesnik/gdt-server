import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

@Injectable()
export class UnAuthGuard implements CanActivate {
	public constructor(private readonly configService: ConfigService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()
		if (typeof request.session.userId !== 'undefined') {
			throw new BadRequestException('Вы уже находитесь в системе.')
		}

		return true
	}
}
