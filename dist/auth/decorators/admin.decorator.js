"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administration = Administration;
const admin_guard_1 = require("../guards/admin.guard");
const common_1 = require("@nestjs/common");
function Administration() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(admin_guard_1.AdminGuard));
}
//# sourceMappingURL=admin.decorator.js.map