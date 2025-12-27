import type { User } from 'modules/users/user.entity';
import type { ERoles } from 'modules/roles/role.types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      role?: ERoles;
    }
  }
}

export {};
