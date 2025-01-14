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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const argon2_1 = require("argon2");
const __generated__1 = require("../../prisma/__generated__/index.js");
let AuthService = class AuthService {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    async register(request, dto) {
        const isExistEmail = await this.userService.findByEmail(dto.email);
        const isExistLogin = await this.userService.findByLogin(dto.login);
        if (isExistEmail) {
            throw new common_1.ConflictException('Пользователь с данным email уже существует.');
        }
        if (isExistLogin) {
            throw new common_1.ConflictException('Пользователь с данным логином уже существует.');
        }
        const newUser = await this.userService.create(dto.login, dto.email, dto.password, dto.name, dto.surname, dto.secondname, '', __generated__1.AuthMethod.CREDENTIAL, false);
        return this.saveSession(request, newUser);
    }
    async login(request, dto) {
        const user = await this.userService.findByLogin(dto.login);
        if (!user || !user.password) {
            throw new common_1.NotFoundException('Пользователь не найден.');
        }
        const isValidPassword = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Неверный паорь.');
        }
        return this.saveSession(request, user);
    }
    async loginEmail(request, dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user || !user.password) {
            throw new common_1.NotFoundException('Пользователь не найден.');
        }
        const isValidPassword = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Неверный пароль.');
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
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map