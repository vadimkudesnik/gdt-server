import { AuthService } from './auth.service';
import { LoginEmailDTO } from './dto/login-email.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ProviderService } from './provider/provider.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    private readonly providerService;
    constructor(authService: AuthService, configService: ConfigService, providerService: ProviderService);
    register(request: Request, dto: RegisterDTO): Promise<{
        message: string;
    }>;
    loginEmail(request: Request, dto: LoginEmailDTO): Promise<{
        email: string;
        password: string;
        login: string;
        name: string;
        surname: string;
        secondname: string | null;
        picture: string | null;
        id: string;
        isTwoFactorEnabled: boolean;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    } | import("../captcha/types/captcha.type").TypeCaptcha | {
        message: string;
    }>;
    login(request: Request, dto: LoginDTO): Promise<{
        email: string;
        password: string;
        login: string;
        name: string;
        surname: string;
        secondname: string | null;
        picture: string | null;
        id: string;
        isTwoFactorEnabled: boolean;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    } | import("../captcha/types/captcha.type").TypeCaptcha | {
        message: string;
    }>;
    callback(request: Request, response: Response, code: string, provider: string): Promise<void>;
    connect(provider: string): Promise<{
        url: string;
    }>;
    logout(request: Request, response: Response): Promise<boolean>;
}
