import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

@Injectable()
export class UnAuthGuard implements CanActivate {
	public constructor(private readonly configService: ConfigService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()
		if (typeof request.session.userId !== 'undefined') {
			const response = context.switchToHttp().getResponse<Response>()
			response
				.status(403)
				.redirect(
					`${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/dashboard/settings`
				)
		}

		return true
	}
}
