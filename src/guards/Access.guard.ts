import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("You are not authorized");
    }

    const validToken = this.authService.validateToken(token);
    if (validToken.error) {
      throw new UnauthorizedException(validToken.error);
    }

    request.token = token;

    return true;
  }
}
