import { LoginEmailDTO } from './dto/login-email.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { ProviderService } from './provider/provider.service';
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
    constructor(prismaService: PrismaService, userService: UserService, configService: ConfigService, providerService: ProviderService, emailConfirmationService: EmailConfirmationService);
    register(request: Request, dto: RegisterDTO): Promise<{
        message: string;
    }>;
    login(request: Request, dto: LoginDTO): Promise<User>;
    loginEmail(request: Request, dto: LoginEmailDTO): Promise<User>;
    extractProfileFromCode(request: Request, provider: string, code: string): Promise<{
        email: string;
        password: string;
        login: string;
        name: string;
        surname: string;
        secondname: string | null;
        picture: string | null;
        id: string;
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
