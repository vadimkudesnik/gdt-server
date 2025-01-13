"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = Authorization;
const auth_guard_1 = require("../guards/auth.guard");
const common_1 = require("@nestjs/common");
function Authorization() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
//# sourceMappingURL=auth.decorator.js.map