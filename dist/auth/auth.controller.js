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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const RefreshToken_decorator_1 = require("../decorators/RefreshToken.decorator");
const SignIn_decorator_1 = require("../decorators/SignIn.decorator");
const SignUp_decorator_1 = require("../decorators/SignUp.decorator");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const login_user_dto_1 = require("./dto/login-user.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async signUp(dto, response) {
        const { userName, _id, accessToken, refreshToken } = await this.authService.signUp(dto);
        response.cookie("refreshToken", refreshToken, {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "strict",
            httpOnly: true,
        });
        return {
            user: {
                username: userName,
                _id: _id,
            },
            accessToken,
        };
    }
    async signIn(dto, response) {
        const { user, accessToken, refreshToken } = await this.authService.signIn(dto);
        response.cookie("refreshToken", refreshToken, {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            sameSite: "strict",
            httpOnly: true,
        });
        return {
            user: {
                username: user.username,
                _id: user._id,
            },
            accessToken,
        };
    }
    async logout(response, request) {
        const validToken = this.authService.validateToken(typeof request.cookies["refreshToken"] === "string"
            ? request.cookies["refreshToken"]
            : request.cookies["refreshToken"].refreshToken);
        if (validToken === null || validToken === void 0 ? void 0 : validToken.error) {
            return "";
        }
        else {
            response.clearCookie("refreshToken");
            return "";
        }
    }
    async refreshToken(request, response) {
        const token = typeof request.cookies["refreshToken"] === "string"
            ? request.cookies["refreshToken"]
            : request.cookies["refreshToken"].refreshToken;
        const userId = await this.authService.validateToken(token).userId;
        const user = await this.userService.findOneById(userId);
        const newAccess = await this.authService.getNewAccessToken(user);
        return Object.assign({ user: {
                username: user.username,
                _id: user._id,
            } }, newAccess);
    }
};
__decorate([
    (0, common_1.Post)("/signup"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, SignUp_decorator_1.SignUp)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("/signin"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, SignIn_decorator_1.SignIn)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)("/logout"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "logout", null);
__decorate([
    (0, RefreshToken_decorator_1.RefreshToken)(),
    (0, common_1.Get)("/refreshToken"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map