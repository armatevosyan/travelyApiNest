import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { ERoles } from 'modules/roles/role.types';
import { User } from '@/modules/users/user.entity';

interface Request extends ExecutionContext {
  role: ERoles;
  user: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request: Request = context.switchToHttp().getRequest();

    if (!requiredRoles || requiredRoles.length === 0) return true;

    return requiredRoles.includes(request.role);
  }
}
