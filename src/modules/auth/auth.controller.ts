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

    const { otp, otpExpiration } = this.authService.generateOtp();
    const newUser = await this.userService.create({
      ...data,
      roleId: role.id,
      verifyCode: otp,
      otpExpiration,
      isActive: false,
    });

    await this.authService.sendVerificationEmail(data.email, otp);

    return {
      message:
        'User registered successfully. Please check your email for verification code.',
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        isActive: false,
      },
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

    if (!user.verifiedAt) {
      throw new UnauthorizedException(
        'Please verify your email before signing in. Check your email for verification code.',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Your account is deactivated. Please contact support.',
      );
    }

    const accessToken = this.authService.accessToken(user.id, user.role);

    return {
      user: this.userService.runUserData(user),
      accessToken,
    };
  }

  @Post('verify-email')
  async verifyEmail(@Body() data: { email: string; code: string }) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.verifiedAt) {
      throw new BadRequestException('Email already verified');
    }

    if (!user.verifyCode || user.verifyCode !== data.code) {
      throw new BadRequestException('Invalid verification code');
    }

    if (user.otpExpiration && new Date() > user.otpExpiration) {
      throw new BadRequestException('Verification code has expired');
    }

    const updatedUser = await this.userService.update(user.id, {
      verifiedAt: new Date(),
      isActive: true,
      verifyCode: null,
      otpExpiration: null,
    });
    const accessToken = this.authService.accessToken(user.id, user.role);

    await this.authService.sendWelcomeEmail(data.email, user.fullName);

    return {
      message: 'Email verified successfully',
      user: updatedUser,
      accessToken,
    };
  }

  @Post('resend-verification')
  async resendVerification(@Body() data: { email: string }) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.verifiedAt) {
      throw new BadRequestException('Email already verified');
    }

    const { otp, otpExpiration } = this.authService.generateOtp();
    await this.userService.update(user.id, {
      verifyCode: otp,
      otpExpiration,
    });

    await this.authService.sendVerificationEmail(data.email, otp);

    return {
      message: 'Verification code sent successfully',
    };
  }
}
