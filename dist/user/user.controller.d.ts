import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from 'prisma/__generated__';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findProfile(userId: string): Promise<User>;
    findById(id: string): Promise<User>;
    updateProfile(userId: string, dto: UpdateUserDTO): Promise<User>;
}
