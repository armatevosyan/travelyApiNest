import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // If there is no/invalid token, just proceed as unauthenticated.
  handleRequest(err: any, user: any) {
    return user ?? null;
  }
}
