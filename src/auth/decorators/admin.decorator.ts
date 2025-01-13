import { AdminGuard } from '../guards/admin.guard'
import { applyDecorators, UseGuards } from '@nestjs/common'

export function Administration() {
	return applyDecorators(UseGuards(AdminGuard))
}
