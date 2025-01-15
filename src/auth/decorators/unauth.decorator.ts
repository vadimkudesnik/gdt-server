import { UnAuthGuard } from '../guards/unauth.guard'
import { applyDecorators, UseGuards } from '@nestjs/common'

export function Unauthorized() {
	return applyDecorators(UseGuards(UnAuthGuard))
}
