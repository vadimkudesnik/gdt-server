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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const admin_decorator_1 = require("../auth/decorators/admin.decorator");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const authorized_decorator_1 = require("../auth/decorators/authorized.decorator");
const common_1 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findProfile(userId) {
        return this.userService.findById(userId);
    }
    async findById(id) {
        return this.userService.findById(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('profile'),
    __param(0, (0, authorized_decorator_1.Athorized)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findProfile", null);
__decorate([
    (0, admin_decorator_1.Administration)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map