"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
const common_1 = require("@nestjs/common");
const SignIn_guard_1 = require("../guards/SignIn.guard");
const SignIn = () => (0, common_1.UseGuards)(SignIn_guard_1.SignInGuard);
exports.SignIn = SignIn;
//# sourceMappingURL=SignIn.decorator.js.map