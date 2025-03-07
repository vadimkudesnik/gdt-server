import { AppModule } from './app.module'
import { ms, StringValue } from './libs/common/utils/ms.utils'
import { parseBoolean } from './libs/common/utils/parse-boolean.util'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as fs from 'fs';
import IORedis from 'ioredis'
import { setupSwagger } from './swagger-setup'

async function bootstrap() {
	const httpsOptions = {
		key: fs.readFileSync('/etc/letsencrypt/live/sauschkin.ru/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/sauschkin.ru/cert.pem'),
	}
	
	const app = await NestFactory.create(AppModule, { httpsOptions })
	const config = app.get(ConfigService)
	const redis = new IORedis(config.getOrThrow<string>('REDIS_URI'))



	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: true,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
				httpOnly: parseBoolean(
					config.getOrThrow<string>('SESSION_HTTP_ONLY')
				),
				secure: parseBoolean(
					config.getOrThrow<string>('SESSION_SECURE')
				),
				sameSite: 'lax'
			},
			store: new RedisStore({
				client: redis,
				prefix: config.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)
	if (parseBoolean(config.getOrThrow<string>('SWAGGER_ENABLED'))) {
		await setupSwagger(app)
	}
	
	await app.listen(config.getOrThrow<number>('APPLICATION_PORT'))
}
bootstrap()
