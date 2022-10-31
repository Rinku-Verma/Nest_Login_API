import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  public body = 'rinkuverma1@gmail.com';
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.header.body === 'rinkuverma@gmail.com') {
      return true;
    } else {
      return false;
    }
  }
}
