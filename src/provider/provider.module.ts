import { ProviderController } from './provider.controller'
import { ProviderService } from './provider.service'
import { Module } from '@nestjs/common'

@Module({
	controllers: [ProviderController],
	providers: [ProviderService]
})
export class ProviderModule {}
