import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class SignUpGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username } = request.body;
    return this.userService.validateUser(username).then((user) => {
      if (user) {
        throw new UnauthorizedException("User already exists");
      }
      return true;
    });
  }
}
