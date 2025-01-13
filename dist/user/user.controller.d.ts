import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findProfile(userId: string): Promise<{
        email: string;
        password: string;
        login: string;
        name: string;
        surname: string;
        secondname: string | null;
        id: string;
        picture: string | null;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<{
        email: string;
        password: string;
        login: string;
        name: string;
        surname: string;
        secondname: string | null;
        id: string;
        picture: string | null;
        isAdmin: boolean;
        isNewsManager: boolean;
        isVerified: boolean;
        isTwoFactorEnabled: boolean;
        method: import("prisma/__generated__").$Enums.AuthMethod;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
