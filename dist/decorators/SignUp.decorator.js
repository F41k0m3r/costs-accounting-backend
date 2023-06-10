"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
const common_1 = require("@nestjs/common");
const SignUp_guard_1 = require("../guards/SignUp.guard");
const SignUp = () => (0, common_1.UseGuards)(SignUp_guard_1.SignUpGuard);
exports.SignUp = SignUp;
//# sourceMappingURL=SignUp.decorator.js.map