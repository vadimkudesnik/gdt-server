"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const email_confirmation_service_1 = require("./email-confirmation/email-confirmation.service");
const provider_service_1 = require("./provider/provider.service");
const two_factor_auth_service_1 = require("./two-factor-auth/two-factor-auth.service");
const captcha_service_1 = require("../captcha/captcha.service");
const parse_boolean_util_1 = require("../libs/common/utils/parse-boolean.util");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const argon2_1 = require("argon2");
const __generated__1 = require("../../prisma/__generated__/index.js");
let AuthService = class AuthService {
    constructor(prismaService, userService, configService, providerService, emailConfirmationService, twoFactorAuthService, captchaService) {
        this.prismaService = prismaService;
        this.userService = userService;
        this.configService = configService;
        this.providerService = providerService;
        this.emailConfirmationService = emailConfirmationService;
        this.twoFactorAuthService = twoFactorAuthService;
        this.captchaService = captchaService;
    }
    async register(request, dto) {
        if (!dto.captchaAnswer) {
            return this.captchaService.generateCaptcha();
        }
        const validate = await this.captchaService.validateCaptcha(dto.captchaAnswer, dto.captchaToken);
        if (!validate.valid) {
            throw new common_1.UnauthorizedException('Не пройдена проверка CAPTCHA');
        }
        const isExistEmail = await this.userService.findByEmail(dto.email);
        const isExistLogin = await this.userService.findByLogin(dto.login);
        if (isExistEmail) {
            throw new common_1.ConflictException('Пользователь с данным email уже существует.');
        }
        if (isExistLogin) {
            throw new common_1.ConflictException('Пользователь с данным логином уже существует.');
        }
        const newUser = await this.userService.create(dto.login, dto.email, dto.password, dto.name, dto.surname, dto.secondname, '', __generated__1.AuthMethod.CREDENTIAL, false);
        const enabledEmail = this.configService.getOrThrow('MAIL');
        if ((0, parse_boolean_util_1.parseBoolean)(enabledEmail)) {
            await this.emailConfirmationService.sendVerificationToken(newUser.email);
            return {
                message: 'Пожалуйста подтвердите Ваш email или войдите в систему.'
            };
        }
        if (!(0, parse_boolean_util_1.parseBoolean)(enabledEmail)) {
            return {
                message: 'Вы зарегестрированы. Войдите в систему.'
            };
        }
    }
    async login(request, dto) {
        if (!dto.captchaAnswer) {
            return this.captchaService.generateCaptcha();
        }
        const validate = await this.captchaService.validateCaptcha(dto.captchaAnswer, dto.captchaToken);
        if (!validate.valid) {
            throw new common_1.UnauthorizedException('Не пройдена проверка CAPTCHA');
        }
        const user = await this.userService.findByLogin(dto.login);
        if (!user || !user.password) {
            throw new common_1.NotFoundException('Пользователь не найден.');
        }
        const isValidPassword = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Неверный пароль.');
        }
        const enabledEmail = this.configService.getOrThrow('MAIL');
        if ((0, parse_boolean_util_1.parseBoolean)(enabledEmail)) {
            if (!user.isVerified) {
                await this.emailConfirmationService.sendVerificationToken(user.email);
                throw new common_1.UnauthorizedException('Ваш email не подтвержден. Пожалуйста проверьте почту и подтвердите адрес.');
            }
        }
        if (user.isTwoFactorEnabled) {
            if (!dto.code) {
                await this.twoFactorAuthService.sendTwoFactorAuthToken(user.email);
                return {
                    message: 'Проверьте Вашу почту. Требуется код двхфакторной аутентификации.'
                };
            }
            await this.twoFactorAuthService.validateTwoFactorToken(user.email, dto.code);
        }
        return this.saveSession(request, user);
    }
    async loginEmail(request, dto) {
        if (!dto.captchaAnswer) {
            return this.captchaService.generateCaptcha();
        }
        const validate = await this.captchaService.validateCaptcha(dto.captchaAnswer, dto.captchaToken);
        if (!validate.valid) {
            throw new common_1.UnauthorizedException('Не пройдена проверка CAPTCHA');
        }
        const user = await this.userService.findByEmail(dto.email);
        if (!user || !user.password) {
            throw new common_1.NotFoundException('Пользователь не найден.');
        }
        const isValidPassword = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Неверный пароль.');
        }
        const enabledEmail = this.configService.getOrThrow('MAIL');
        if ((0, parse_boolean_util_1.parseBoolean)(enabledEmail)) {
            if (!user.isVerified) {
                await this.emailConfirmationService.sendVerificationToken(user.email);
                throw new common_1.UnauthorizedException('Ваш email не подтвержден. Пожалуйста проверьте почту и подтвердите адрес.');
            }
        }
        if (user.isTwoFactorEnabled) {
            if (!dto.code) {
                await this.twoFactorAuthService.sendTwoFactorAuthToken(user.email);
                return {
                    message: 'Проверьте Вашу почту. Требуется код двхфакторной аутентификации.'
                };
            }
            await this.twoFactorAuthService.validateTwoFactorToken(user.email, dto.code);
        }
        return this.saveSession(request, user);
    }
    async extractProfileFromCode(request, provider, code) {
        const providerInstance = this.providerService.findByService(provider);
        const profile = await providerInstance.findUserByCode(code);
        const account = await this.prismaService.account.findFirst({
            where: {
                id: profile.id,
                provider: profile.provider
            }
        });
        let user = account?.userId
            ? await this.userService.findById(account.userId)
            : null;
        if (user) {
            return this.saveSession(request, user);
        }
        const isExistEmail = await this.userService.findByEmail(profile.email);
        if (isExistEmail) {
            user = await this.userService.editVerified(profile.email, __generated__1.AuthMethod[profile.provider.toUpperCase()], true);
            if (!account) {
                await this.prismaService.account.create({
                    data: {
                        userId: user.id,
                        type: 'oauth',
                        provider: profile.provider,
                        accessToken: profile.access_token,
                        refreshToken: profile.refresh_token,
                        expiresAt: profile.expires_at
                    }
                });
            }
            return this.saveSession(request, user);
        }
        user = await this.userService.create(this.makeString(), profile.email, this.makeString(), profile.name, '', '', profile.picture, __generated__1.AuthMethod[profile.provider.toUpperCase()], true);
        if (!account) {
            await this.prismaService.account.create({
                data: {
                    userId: user.id,
                    type: 'oauth',
                    provider: profile.provider,
                    accessToken: profile.access_token,
                    refreshToken: profile.refresh_token,
                    expiresAt: profile.expires_at
                }
            });
        }
        return this.saveSession(request, user);
    }
    async logout(request, response) {
        return new Promise((resolve, reject) => {
            request.session.destroy(error => {
                if (error) {
                    return reject(new common_1.InternalServerErrorException('Не удалось завершить сессию'));
                }
                response.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
                resolve();
            });
        });
    }
    makeString() {
        let outString = '';
        const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
            outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
        }
        return outString;
    }
    async saveSession(request, user) {
        return new Promise((resolve, reject) => {
            request.session.userId = user.id;
            request.session.save(error => {
                if (error) {
                    return reject(new common_1.InternalServerErrorException('Не удалось сохранить сессию.'));
                }
                resolve(user);
            });
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => email_confirmation_service_1.EmailConfirmationService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        config_1.ConfigService,
        provider_service_1.ProviderService,
        email_confirmation_service_1.EmailConfirmationService,
        two_factor_auth_service_1.TwoFactorAuthService,
        captcha_service_1.CaptchaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map