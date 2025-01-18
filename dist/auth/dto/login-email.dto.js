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
exports.LoginEmailDTO = void 0;
const class_validator_1 = require("class-validator");
class LoginEmailDTO {
}
exports.LoginEmailDTO = LoginEmailDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Email должен быть строковыми данными.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Некорректный формат email' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email обязателен для ввода.' }),
    __metadata("design:type", String)
], LoginEmailDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Пароль должен быть строковыми данными.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Пароль обязателен для ввода.' }),
    (0, class_validator_1.MinLength)(8, { message: 'Пароль должен содержать минимум 8 символов.' }),
    (0, class_validator_1.MaxLength)(40, { message: 'Паоль должен содержать не более 40 символов.' }),
    __metadata("design:type", String)
], LoginEmailDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'Код двухфакторной аутентификации должен быть строковыми данными.'
    }),
    __metadata("design:type", String)
], LoginEmailDTO.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Captcha должен быть строковыми данными.' }),
    __metadata("design:type", String)
], LoginEmailDTO.prototype, "captchaToken", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Captcha должен быть строковыми данными.' }),
    __metadata("design:type", String)
], LoginEmailDTO.prototype, "captchaAnswer", void 0);
//# sourceMappingURL=login-email.dto.js.map