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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const argon2_1 = require("argon2");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let AuthService = class AuthService {
    constructor(usersModel, jwtService) {
        this.usersModel = usersModel;
        this.jwtService = jwtService;
    }
    async signUp(dto) {
        const oldUser = await this.usersModel.collection.findOne({
            username: dto.username,
        });
        if (oldUser) {
            throw new Error("User already exists");
        }
        const createdUser = await new this.usersModel({
            username: dto.username,
            password: await (0, argon2_1.hash)(dto.password),
        }).save();
        const accessToken = await this.getNewAccessToken(createdUser);
        const refreshToken = await this.getNewRefreshToken(String(createdUser._id));
        return Object.assign(Object.assign({ user: createdUser }, accessToken), refreshToken);
    }
    async signIn(dto) {
        const user = await this.usersModel.collection.findOne({
            username: dto.username,
        });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        const accessToken = await this.getNewAccessToken(user);
        const refreshToken = await this.getNewRefreshToken(String(user._id));
        return Object.assign(Object.assign({ user: user }, accessToken), refreshToken);
    }
    async getNewAccessToken(user) {
        const accessToken = this.jwtService.sign({
            user: {
                username: user.username,
                _id: user._id,
            },
        }, {
            secret: process.env.JWT_SECRET,
            expiresIn: "10m",
        });
        return {
            accessToken,
        };
    }
    async getNewRefreshToken(userId) {
        return {
            refreshToken: this.jwtService.sign({ userId }, {
                secret: process.env.JWT_SECRET,
                expiresIn: "7d",
            }),
        };
    }
    validateToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            return { error: error.message };
        }
    }
    getUserByToken(token) {
        const decodedJwtAccessToken = this.jwtService.decode(token);
        const user = decodedJwtAccessToken.user;
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map