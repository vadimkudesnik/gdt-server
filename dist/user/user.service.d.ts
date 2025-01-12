import { PrismaService } from '@/prisma/prisma.service';
import { AuthMethod, User } from 'prisma/__generated__';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByLogin(login: string): Promise<User>;
    create(login: string, email: string, password: string, name: string, surname: string, secondname: string, picture: string, method: AuthMethod, isVerified: boolean): Promise<User>;
}
