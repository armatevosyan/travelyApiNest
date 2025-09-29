import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';

@Controller('users')
@UseGuards(RolesGuard) // Protect all routes in this controller
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN) // Any authenticated user
  me(@User() user: IUser, @User('role') role: ERoles) {
    console.log(role, 'role');
    return user;
  }

  @Get('public')
  public() {
    return { message: 'Test API for all users.' };
  }
}
