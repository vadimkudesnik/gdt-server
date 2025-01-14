import { ProviderService } from './provider.service'
import { Controller } from '@nestjs/common'

@Controller('provider')
export class ProviderController {
	constructor(private readonly providerService: ProviderService) {}
}
