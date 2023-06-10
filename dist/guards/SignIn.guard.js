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
exports.SignInGuard = void 0;
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const user_service_1 = require("../user/user.service");
let SignInGuard = class SignInGuard {
    constructor(userService) {
        this.userService = userService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { username, password } = request.body;
        return this.userService.validateUser(username).then((user) => {
            if (!user) {
                throw new common_1.UnauthorizedException("User not found");
            }
            if (!(0, argon2_1.verify)(user.password, password)) {
                throw new common_1.UnauthorizedException("Password is incorrect");
            }
            return true;
        });
    }
};
SignInGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], SignInGuard);
exports.SignInGuard = SignInGuard;
//# sourceMappingURL=SignIn.guard.js.map