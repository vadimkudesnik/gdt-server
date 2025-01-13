import { CaptchaService } from './captcha.service';
export declare class CaptchaController {
    private readonly captchaService;
    constructor(captchaService: CaptchaService);
    generateCaptcha(): Promise<import("./types/captcha.type").TypeCaptcha>;
    validateCaptcha(answer: string, token: string): Promise<import("./types/validate.type").TypeCaptchaValidate>;
}
