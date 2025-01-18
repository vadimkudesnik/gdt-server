"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./auth/auth.module");
const email_confirmation_module_1 = require("./auth/email-confirmation/email-confirmation.module");
const password_recovery_module_1 = require("./auth/password-recovery/password-recovery.module");
const provider_module_1 = require("./auth/provider/provider.module");
const two_factor_auth_module_1 = require("./auth/two-factor-auth/two-factor-auth.module");
const captcha_module_1 = require("./captcha/captcha.module");
const is_dev_util_1 = require("./libs/common/utils/is-dev.util");
const mail_module_1 = require("./libs/mail/mail.module");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: !is_dev_util_1.IS_DEV_ENV,
                isGlobal: true
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            provider_module_1.ProviderModule,
            captcha_module_1.CaptchaModule,
            mail_module_1.MailModule,
            email_confirmation_module_1.EmailConfirmationModule,
            password_recovery_module_1.PasswordRecoveryModule,
            two_factor_auth_module_1.TwoFactorAuthModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map