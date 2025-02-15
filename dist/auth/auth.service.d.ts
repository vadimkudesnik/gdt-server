import { LoginEmailDTO } from './dto/login-email.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { ProviderService } from './provider/provider.service';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';
import { CaptchaService } from '@/captcha/captcha.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from 'prisma/__generated__';
export declare class AuthService {
    private readonly prismaService;
    private readonly userService;
    private readonly configService;
    private readonly providerService;
    private readonly emailConfirmationService;
    private readonly twoFactorAuthService;
    private readonly captchaService;
    constructor(prismaService: PrismaService, userService: UserService, configService: ConfigService, providerService: ProviderService, emailConfirmationService: EmailConfirmationService, twoFactorAuthService: TwoFactorAuthService, captchaService: CaptchaService);
    register(request: Request, dto: RegisterDTO): Promise<import("../captcha/types/captcha.type").TypeCaptcha | {
        message: string;
    }>;
    login(request: Request, dto: LoginDTO): Promise<import("../captcha/types/captcha.type").TypeCaptcha | {
        name: string;
        id: string;
        login: string;
        email: string;
        password: string;
        surname: string;
        secondname: string | null;
        picture: string | null;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
    loginEmail(request: Request, dto: LoginEmailDTO): Promise<import("../captcha/types/captcha.type").TypeCaptcha | {
        name: string;
        id: string;
        login: string;
        email: string;
        password: string;
        surname: string;
        secondname: string | null;
        picture: string | null;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
    extractProfileFromCode(request: Request, provider: string, code: string): Promise<{
        name: string;
        id: string;
        login: string;
        email: string;
        password: string;
        surname: string;
        secondname: string | null;
        picture: string | null;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    }>;
    logout(request: Request, response: Response): Promise<void>;
    makeString(): string;
    saveSession(request: Request, user: User): Promise<User>;
}
