import { LoginEmailDTO } from './dto/login-email.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from '@/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from 'prisma/__generated__';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    register(request: Request, dto: RegisterDTO): Promise<User>;
    login(request: Request, dto: LoginDTO): Promise<User>;
    loginEmail(request: Request, dto: LoginEmailDTO): Promise<User>;
    logout(request: Request, response: Response): Promise<void>;
    private saveSession;
}
