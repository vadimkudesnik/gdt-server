"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Athorized = void 0;
const common_1 = require("@nestjs/common");
exports.Athorized = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return data ? user[data] : user;
});
//# sourceMappingURL=authorized.decorator.js.map