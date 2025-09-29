import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'modules/users/user.service';
import { RoleService } from 'modules/roles/role.service';
import { ERoles } from 'modules/roles/role.types';

import * as authTypes from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: authTypes.SignUpData) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const role = await this.roleService.findByName(ERoles.USER);
    if (!role) {
      throw new BadRequestException('Default role not found');
    }

    data.password = await this.authService.hashPassword(data.password);
    data.roleId = role.id;

    const newUser = await this.userService.create(data);
    const accessToken = this.authService.accessToken(newUser.id, role);

    return {
      user: newUser,
      accessToken,
    };
  }

  @Post('sign-in')
  async signIn(@Body() data: authTypes.SignInData) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.authService.comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.authService.accessToken(user.id, user.role);

    return {
      user: this.userService.runUserData(user),
      accessToken,
    };
  }
}
