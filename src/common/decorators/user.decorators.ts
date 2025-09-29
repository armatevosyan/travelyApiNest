import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as IUser } from 'modules/users/user.entity';
import { ERoles } from '@/modules/roles/role.types';

interface Request extends ExecutionContext {
  user: IUser;
  role: ERoles;
}

export const User = createParamDecorator(
  async (data: 'id' | 'role' | undefined, ctx: ExecutionContext) => {
    const request: Request = await ctx.switchToHttp().getRequest();
    const user = request.user;
    const role = request.role;

    if (!user) return null;

    if (data === 'id') return user.id;
    if (data === 'role') return role;
    return user; // default: return full user object
  },
);
