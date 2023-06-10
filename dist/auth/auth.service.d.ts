import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { User, UsersDocument } from "src/user/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class AuthService {
    private usersModel;
    private jwtService;
    constructor(usersModel: Model<UsersDocument>, jwtService: JwtService);
    signUp(dto: CreateUserDto): Promise<any>;
    signIn(dto: LoginUserDto): Promise<any>;
    getNewAccessToken(user: User): Promise<any>;
    getNewRefreshToken(userId: string): Promise<any>;
    validateToken(token: string): any;
    getUserByToken(token: string): User;
}
