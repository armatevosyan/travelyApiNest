import { ERoles } from '@/modules/roles/role.types';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: ERoles[]) => import("@nestjs/common").CustomDecorator<string>;
