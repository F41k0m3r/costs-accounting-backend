import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { hash } from "argon2";
import { Model } from "mongoose";
import { User, UsersDocument } from "src/user/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

type PayloadType = {
  user: User;
  exp: string;
  iat: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService
  ) {}

  async signUp(dto: CreateUserDto): Promise<any> {
    const oldUser = await this.usersModel.collection.findOne({
      username: dto.username,
    });

    if (oldUser) {
      throw new Error("User already exists");
    }
    const createdUser = await new this.usersModel({
      username: dto.username,
      password: await hash(dto.password),
    }).save();

    const accessToken = await this.getNewAccessToken(createdUser);
    const refreshToken = await this.getNewRefreshToken(String(createdUser._id));

    return {
      user: createdUser,
      ...accessToken,
      ...refreshToken,
    };
  }

  async signIn(dto: LoginUserDto): Promise<any> {
    const user = await this.usersModel.collection.findOne({
      username: dto.username,
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }
    const accessToken = await this.getNewAccessToken(user as User);
    const refreshToken = await this.getNewRefreshToken(String(user._id));

    return {
      user: user,
      ...accessToken,
      ...refreshToken,
    };
  }

  async getNewAccessToken(user: User): Promise<any> {
    const accessToken = this.jwtService.sign(
      {
        user: {
          username: user.username,
          _id: user._id,
        },
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: "10m",
      }
    );
    return {
      accessToken,
    };
  }
  async getNewRefreshToken(userId: string): Promise<any> {
    return {
      refreshToken: this.jwtService.sign(
        { userId },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: "7d",
        }
      ),
    };
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return { error: error.message };
    }
  }
  getUserByToken(token: string) {
    const decodedJwtAccessToken = this.jwtService.decode(token) as PayloadType;
    const user = decodedJwtAccessToken.user;

    return user;
  }
}
