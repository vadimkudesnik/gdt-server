"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const email_confirmation_module_1 = require("./email-confirmation/email-confirmation.module");
const provider_module_1 = require("./provider/provider.module");
const providers_config_1 = require("../config/providers.config");
const mail_service_1 = require("../libs/mail/mail.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            provider_module_1.ProviderModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: providers_config_1.getProvidersConfig,
                inject: [config_1.ConfigService]
            }),
            (0, common_1.forwardRef)(() => email_confirmation_module_1.EmailConfirmationModule)
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, mail_service_1.MailService, user_service_1.UserService],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map