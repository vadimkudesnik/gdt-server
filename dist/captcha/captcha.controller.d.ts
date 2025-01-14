import { CaptchaService } from './captcha.service';
import { TypeCaptcha } from './types/captcha.type';
import { TypeCaptchaValidate } from './types/validate.type';
export declare class CaptchaController {
    private readonly captchaService;
    constructor(captchaService: CaptchaService);
    generateCaptcha(): Promise<TypeCaptcha>;
    validateCaptcha(answer: string, token: string): Promise<TypeCaptchaValidate>;
}
