import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signUp(dto: CreateUserDto, response: any): Promise<any>;
    signIn(dto: LoginUserDto, response: any): Promise<any>;
    logout(response: any, request: any): Promise<any>;
    refreshToken(request: any, response: any): Promise<any>;
}
