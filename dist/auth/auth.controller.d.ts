import { AuthService } from './auth.service';
import { LoginEmailDTO } from './dto/login-email.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Request, Response } from 'express';
import { User } from 'prisma/__generated__';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(request: Request, dto: RegisterDTO): Promise<User>;
    loginEmail(request: Request, dto: LoginEmailDTO): Promise<User>;
    login(request: Request, dto: LoginDTO): Promise<User>;
    logout(request: Request, response: Response): Promise<void>;
}
