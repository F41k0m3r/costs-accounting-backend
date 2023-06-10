import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { verify } from "argon2";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class SignInGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { username, password } = request.body;
    return this.userService.validateUser(username).then((user) => {
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      if (!verify(user.password, password)) {
        throw new UnauthorizedException("Password is incorrect");
      }
      return true;
    });
  }
}
