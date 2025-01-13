import { TypeCaptcha } from './types/captcha.type';
import { TypeCaptchaValidate } from './types/validate.type';
import { ConfigService } from '@nestjs/config';
export declare class CaptchaService {
    private readonly configService;
    constructor(configService: ConfigService);
    protected extractCaptchaData(data: any): Promise<TypeCaptcha>;
    protected extractValidateData(data: any): Promise<TypeCaptchaValidate>;
    generateCaptcha(): Promise<TypeCaptcha>;
    validateCaptcha(answer: string, token: string): Promise<TypeCaptchaValidate>;
}
