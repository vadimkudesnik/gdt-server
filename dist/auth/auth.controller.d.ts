import { AuthService } from './auth.service';
import { LoginEmailDTO } from './dto/login-email.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(request: Request, dto: RegisterDTO): Promise<unknown>;
    loginEmail(request: Request, dto: LoginEmailDTO): Promise<unknown>;
    login(request: Request, dto: LoginDTO): Promise<unknown>;
    logout(request: Request, response: Response): Promise<void>;
}
