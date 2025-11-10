import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';
import { AuthService } from '@/modules/auth/auth.service';
import { I18nService } from 'nestjs-i18n';
import { ChangePasswordDto } from '@/modules/auth/auth.dto';
import { UpdateProfileDto } from './user.dto';

@Controller('users')
@UseGuards(RolesGuard) // Protect all routes in this controller
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

  @Get('me')
  @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN) // Any authenticated user
  me(@User() user: IUser, @User('role') role: ERoles) {
    console.log(role, 'role');
    return user;
  }

  @Patch('profile')
  @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateProfile(@User() user: IUser, @Body() data: UpdateProfileDto) {
    const updatedUser = await this.userService.update(user.id, {
      ...data,
      description: data.description ?? undefined,
    });

    return {
      message: this.i18n.translate('t.PROFILE_UPDATED_SUCCESSFULLY'),
      data: updatedUser,
    };
  }

  @Get('public')
  public() {
    return { message: 'Test API for all users.' };
  }

  @Post('change-password')
  async changePassword(@Body() data: ChangePasswordDto, @User() user: IUser) {
    const hashedNewPassword = await this.authService.hashPassword(
      data.password,
    );

    await this.userService.update(user.id, {
      password: hashedNewPassword,
    });
    return {
      message: this.i18n.translate('t.PASSWORD_CHANGED_SUCCESSFULLY'),
    };
  }

  @Post('deactivate-account')
  @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN)
  async deactivateAccount(@User() user: IUser) {
    await this.userService.update(user.id, {
      isActive: false,
      deactivatedAt: new Date(),
    });

    return {
      message: this.i18n.translate('t.ACCOUNT_DEACTIVATED_SUCCESSFULLY'),
    };
  }
}
