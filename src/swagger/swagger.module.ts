import { SwaggerController } from './swagger.controller'
import { SwaggerService } from './swagger.service'
import { Module } from '@nestjs/common'

@Module({
	controllers: [SwaggerController],
	providers: [SwaggerService]
})
export class SwaggerModule {}
