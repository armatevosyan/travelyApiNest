import { Strategy } from 'passport-jwt';
import { ERoles } from '@/modules/roles/role.types';
import { UserService } from '@/modules/users/user.service';
export interface JwtPayload {
    sub: number;
    role: ERoles;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload): Promise<import("../users/user.entity").User | null>;
}
export {};
