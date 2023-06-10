"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const common_1 = require("@nestjs/common");
const RefreshToken_guard_1 = require("../guards/RefreshToken.guard");
const RefreshToken = () => (0, common_1.UseGuards)(RefreshToken_guard_1.RefreshTokenGuard);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=RefreshToken.decorator.js.map