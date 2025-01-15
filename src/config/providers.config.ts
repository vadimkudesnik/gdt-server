import { TypeOptions } from '@/auth/provider/provider.constants'
import { YandexProvider } from '@/auth/provider/services/yandex.provider'
import { ConfigService } from '@nestjs/config'

export const getProvidersConfig = async (
	configService: ConfigService
): Promise<TypeOptions> => ({
	baseUrl: configService.getOrThrow<string>('APPLICATION_URL'),
	services: [
		new YandexProvider({
			client_id: configService.getOrThrow<string>('YANDEX_CLIENT_ID'),
			client_secret: configService.getOrThrow<string>(
				'YANDEX_CLIENT_SECRET'
			),
			scopes: ['login:email', 'login:avatar', 'login:info']
		})
	]
})
