import {
  Body,
  Post,
  Controller,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AuthService } from './auth.service';
import { UserService } from 'modules/users/user.service';
import { RoleService } from 'modules/roles/role.service';
import { ERoles } from 'modules/roles/role.types';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly i18n: I18nService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException(
        this.i18n.translate('t.USER_ALREADY_EXISTS'),
      );
    }

    const role = await this.roleService.findByName(ERoles.USER);
    if (!role) {
      throw new BadRequestException(
        this.i18n.translate('t.DEFAULT_ROLE_NOT_FOUND'),
      );
    }

    data.password = await this.authService.hashPassword(data.password);

    const newUser = await this.userService.create(data, role.id);
    const accessToken = this.authService.accessToken(newUser.id, role);

    return {
      user: newUser,
      accessToken,
    };
  }

  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException(
        this.i18n.translate('t.INVALID_EMAIL_OR_PASSWORD'),
      );
    }

    const isPasswordValid = await this.authService.comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.i18n.translate('t.INVALID_EMAIL_OR_PASSWORD'),
      );
    }

    const accessToken = this.authService.accessToken(user.id, user.role);

    return {
      user: this.userService.runUserData(user),
      accessToken,
    };
  }
}
