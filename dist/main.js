"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const ms_utils_1 = require("./libs/common/utils/ms.utils");
const parse_boolean_util_1 = require("./libs/common/utils/parse-boolean.util");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const connect_redis_1 = require("connect-redis");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fs = require("fs");
const ioredis_1 = require("ioredis");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/sauschkin.ru/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/sauschkin.ru/cert.pem'),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    const config = app.get(config_1.ConfigService);
    const redis = new ioredis_1.default(config.getOrThrow('REDIS_URI'));
    app.use(cookieParser(config.getOrThrow('COOKIES_SECRET')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    app.enableCors({
        origin: config.getOrThrow('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie']
    });
    app.use(session({
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: true,
        saveUninitialized: false,
        cookie: {
            domain: config.getOrThrow('SESSION_DOMAIN'),
            maxAge: (0, ms_utils_1.ms)(config.getOrThrow('SESSION_MAX_AGE')),
            httpOnly: (0, parse_boolean_util_1.parseBoolean)(config.getOrThrow('SESSION_HTTP_ONLY')),
            secure: (0, parse_boolean_util_1.parseBoolean)(config.getOrThrow('SESSION_SECURE')),
            sameSite: 'lax'
        },
        store: new connect_redis_1.RedisStore({
            client: redis,
            prefix: config.getOrThrow('SESSION_FOLDER')
        })
    }));
    await app.listen(config.getOrThrow('APPLICATION_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map