"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const Access_guard_1 = require("../guards/Access.guard");
const Auth = () => (0, common_1.UseGuards)(Access_guard_1.AccessGuard);
exports.Auth = Auth;
//# sourceMappingURL=Auth.decorator.js.map