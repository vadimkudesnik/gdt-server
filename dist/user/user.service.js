"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findById(id) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            },
            include: {
                accounts: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден. Проверьте введенные данные.');
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            },
            include: {
                accounts: true
            }
        });
        return user;
    }
    async findByLogin(login) {
        const user = await this.prismaService.user.findUnique({
            where: {
                login
            },
            include: {
                accounts: true
            }
        });
        return user;
    }
    async create(login, email, password, name, surname, secondname, picture, method, isVerified) {
        const user = await this.prismaService.user.create({
            data: {
                login,
                email,
                password: password ? await (0, argon2_1.hash)(password) : '',
                name,
                surname,
                secondname,
                picture,
                method,
                isVerified
            },
            include: {
                accounts: true
            }
        });
        return user;
    }
    async editVerified(email, method, isVerified) {
        const user = await this.prismaService.user.update({
            where: {
                email: email
            },
            data: {
                method,
                isVerified
            },
            include: {
                accounts: true
            }
        });
        return user;
    }
    async update(userId, dto) {
        const user = await this.findById(userId);
        const updatedUser = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                login: dto.login,
                email: dto.email,
                name: dto.name,
                surname: dto.surname,
                secondname: dto.secondname,
                isTwoFactorEnabled: dto.isTwoFactorEnabled
            }
        });
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map