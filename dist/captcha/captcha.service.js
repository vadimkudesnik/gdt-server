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
exports.CaptchaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CaptchaService = class CaptchaService {
    constructor(configService) {
        this.configService = configService;
    }
    async extractCaptchaData(data) {
        return {
            ...data
        };
    }
    async extractValidateData(data) {
        return {
            ...data
        };
    }
    async generateCaptcha() {
        const URL = await this.configService.getOrThrow('CAPTCHA_URL');
        const captchaRequest = await fetch(`${URL}/generate`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!captchaRequest) {
            throw new common_1.InternalServerErrorException('Нет доступа к сервису генерации Captcha');
        }
        const data = await captchaRequest.json();
        const CaptchaData = await this.extractCaptchaData(data);
        return CaptchaData;
    }
    async validateCaptcha(answer, token) {
        const URL = await this.configService.getOrThrow('CAPTCHA_URL');
        const captchaRequest = await fetch(`${URL}/validate?answer=${answer}&token=${token}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        const data = await captchaRequest.json();
        const validateData = await this.extractValidateData(data);
        return validateData;
    }
};
exports.CaptchaService = CaptchaService;
exports.CaptchaService = CaptchaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CaptchaService);
//# sourceMappingURL=captcha.service.js.map