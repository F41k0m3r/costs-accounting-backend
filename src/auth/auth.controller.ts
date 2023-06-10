import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { RefreshToken } from "src/decorators/RefreshToken.decorator";
import { SignIn } from "src/decorators/SignIn.decorator";
import { SignUp } from "src/decorators/SignUp.decorator";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("/signup")
  @HttpCode(HttpStatus.CREATED)
  @SignUp()
  async signUp(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) response
  ): Promise<any> {
    const { userName, _id, accessToken, refreshToken } =
      await this.authService.signUp(dto);
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

  @Post("/signin")
  @HttpCode(HttpStatus.OK)
  @SignIn()
  async signIn(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response
  ): Promise<any> {
    const { user, accessToken, refreshToken } = await this.authService.signIn(
      dto
    );

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

  @Get("/logout")
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) response,
    @Req() request
  ): Promise<any> {
    const validToken = this.authService.validateToken(
      typeof request.cookies["refreshToken"] === "string"
        ? request.cookies["refreshToken"]
        : request.cookies["refreshToken"].refreshToken
    );

    if (validToken?.error) {
      return "";
    } else {
      response.clearCookie("refreshToken");
      return "";
    }
  }

  @RefreshToken()
  @Get("/refreshToken")
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() request,
    @Res({ passthrough: true }) response
  ): Promise<any> {
    const token =
      typeof request.cookies["refreshToken"] === "string"
        ? request.cookies["refreshToken"]
        : request.cookies["refreshToken"].refreshToken;

    const userId = await this.authService.validateToken(token).userId;
    const user = await this.userService.findOneById(userId);
    const newAccess = await this.authService.getNewAccessToken(user);
    return {
      user: {
        username: user.username,
        _id: user._id,
      },
      ...newAccess,
    };
  }
}
