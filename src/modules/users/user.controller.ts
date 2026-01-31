import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { User } from '@/common/decorators/user.decorators';
import { User as IUser } from '@/modules/users/user.entity';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';
import { AuthService } from '@/modules/auth/auth.service';
import { I18nService } from 'nestjs-i18n';
import { ChangePasswordDto } from '@/modules/auth/auth.dto';
import { UpdateProfileDto, UpdateNotificationSettingDto } from './user.dto';

@Controller('users')
@UseGuards(RolesGuard) // Protect all routes in this controller
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly i18n: I18nService,
  ) {}

  @Get('me')
  @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN)
  me(@User() user: IUser, @User('role') role: ERoles) {
    console.log(role, 'role');
    return this.userService.runUserData(user);
  }

  @Post('profile')
  // @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateProfile(@User() user: IUser, @Body() data: UpdateProfileDto) {
    try {
      const updatedUser = await this.userService.update(user.id, {
        ...data,
        description: data.description ?? undefined,
      });

      return {
        message: this.i18n.translate('t.PROFILE_UPDATED_SUCCESSFULLY'),
        data: updatedUser,
      };
    } catch (e) {
      console.log('Error while updating profile info', e);
    }
  }

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  async updateProfileImage(
    @User() user: IUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(this.i18n.translate('t.FILE_REQUIRED'));
    }

    // Validate file type (images only)
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/avif',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        this.i18n.translate('t.INVALID_IMAGE_TYPE'),
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException(this.i18n.translate('t.IMAGE_TOO_LARGE'));
    }

    const updatedUser = await this.userService.updateProfileImage(
      user.id,
      file,
    );

    return {
      message: this.i18n.translate('t.PROFILE_IMAGE_UPDATED_SUCCESSFULLY'),
      data: updatedUser,
    };
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

  @Post('notification-setting')
  @Roles(ERoles.USER, ERoles.ADMIN, ERoles.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateNotificationSetting(
    @User() user: IUser,
    @Body() data: UpdateNotificationSettingDto,
  ) {
    const updatedUser = await this.userService.updateNotificationSetting(
      user.id,
      data.notificationsEnabled,
    );

    return {
      message: this.i18n.translate('t.NOTIFICATION_UPDATE_SUCCESS'),
      data: updatedUser,
    };
  }
}
