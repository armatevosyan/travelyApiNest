"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = await ctx.switchToHttp().getRequest();
    const user = request.user;
    const role = request.role;
    if (!user)
        return null;
    if (data === 'id')
        return user.id;
    if (data === 'role')
        return role;
    return user;
});
//# sourceMappingURL=user.decorators.js.map