import { UpdateUserDTO } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthMethod, User } from 'prisma/__generated__';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByLogin(login: string): Promise<User>;
    create(login: string, email: string, password: string, name: string, surname: string, secondname: string, picture: string, method: AuthMethod, isVerified: boolean): Promise<User>;
    editVerified(email: string, method: AuthMethod, isVerified: boolean): Promise<User>;
    update(userId: string, dto: UpdateUserDTO): Promise<{
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
    }>;
}
