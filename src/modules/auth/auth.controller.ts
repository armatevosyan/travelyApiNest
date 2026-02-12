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
import {
  SignInDto,
  SignUpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './auth.dto';

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
      message: this.i18n.translate('t.USER_REGISTERED_SUCCESS'),
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
        this.i18n.translate('t.EMAIL_VERIFICATION_REQUIRED'),
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        this.i18n.translate('t.ACCOUNT_DEACTIVATED'),
      );
    }

    const token = this.authService.accessToken(String(user.id), user.role);

    return {
      user: this.userService.runUserData(user),
      token,
    };
  }

  @Post('verify-email')
  async verifyEmail(@Body() data: { email: string; code: string }) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(this.i18n.translate('t.USER_NOT_FOUND'));
    }

    if (user.verifiedAt) {
      throw new BadRequestException(
        this.i18n.translate('t.EMAIL_ALREADY_VERIFIED'),
      );
    }

    if (!user.verifyCode || user.verifyCode !== data.code) {
      throw new BadRequestException(
        this.i18n.translate('t.INVALID_VERIFICATION_CODE'),
      );
    }

    if (user.otpExpiration && new Date() > user.otpExpiration) {
      throw new BadRequestException(
        this.i18n.translate('t.VERIFICATION_CODE_EXPIRED'),
      );
    }

    const updatedUser = await this.userService.update(user.id, {
      verifiedAt: new Date(),
      isActive: true,
      verifyCode: null,
      otpExpiration: null,
    });
    const token = this.authService.accessToken(String(user.id), user.role);

    await this.authService.sendWelcomeEmail(data.email, user.fullName);

    return {
      message: this.i18n.translate('t.EMAIL_VERIFIED_SUCCESS'),
      user: updatedUser,
      token,
    };
  }

  @Post('resend-verification')
  async resendVerification(@Body() data: { email: string }) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(this.i18n.translate('t.USER_NOT_FOUND'));
    }

    if (user.verifiedAt) {
      throw new BadRequestException(
        this.i18n.translate('t.EMAIL_ALREADY_VERIFIED'),
      );
    }

    const { otp, otpExpiration } = this.authService.generateOtp();
    await this.userService.update(user.id, {
      verifyCode: otp,
      otpExpiration,
    });

    await this.authService.sendVerificationEmail(data.email, otp);

    return {
      message: this.i18n.translate('t.VERIFICATION_CODE_SENT'),
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      return {
        message: this.i18n.translate('t.PASSWORD_RESET_EMAIL_SENT'),
      };
    }

    if (!user.verifiedAt) {
      throw new BadRequestException(
        this.i18n.translate('t.VERIFY_EMAIL_FIRST'),
      );
    }

    if (!user.isActive) {
      throw new BadRequestException(
        this.i18n.translate('t.ACCOUNT_IS_DEACTIVATED'),
      );
    }

    const { otp, otpExpiration } = this.authService.generateOtp();
    await this.userService.update(user.id, {
      otp,
      otpExpiration,
    });

    await this.authService.sendPasswordResetEmail(data.email, otp);

    return {
      message: this.i18n.translate('t.PASSWORD_RESET_EMAIL_SENT'),
    };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: VerifyOtpDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(
        this.i18n.translate('t.INVALID_RESET_TOKEN'),
      );
    }
    if (!user.verifyCode || user.verifyCode !== data.code) {
      throw new BadRequestException(
        this.i18n.translate('t.INVALID_VERIFICATION_CODE'),
      );
    }

    if (user.otpExpiration && new Date() > user.otpExpiration) {
      throw new BadRequestException(
        this.i18n.translate('t.VERIFICATION_CODE_EXPIRED'),
      );
    }

    await this.userService.update(user.id, {
      verifyCode: null,
      otpExpiration: null,
      verifiedAt: new Date(),
    });

    const token = this.authService.accessToken(String(user.id), user.role);

    return {
      message: this.i18n.translate('t.OTP_VERIFIED_SUCCESS'),
      user: this.userService.runUserData(user),
      token,
      success: true,
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(
        this.i18n.translate('t.INVALID_RESET_TOKEN'),
      );
    }

    if (!user.otp || user.otp !== data.code) {
      throw new BadRequestException(
        this.i18n.translate('t.INVALID_VERIFICATION_CODE'),
      );
    }

    if (user.otpExpiration && new Date() > user.otpExpiration) {
      throw new BadRequestException(
        this.i18n.translate('t.VERIFICATION_CODE_EXPIRED'),
      );
    }

    const hashedPassword = await this.authService.hashPassword(
      data.newPassword,
    );

    const updatedUser = await this.userService.update(user.id, {
      password: hashedPassword,
      otp: null,
      otpExpiration: null,
    });

    return {
      message: this.i18n.translate('t.PASSWORD_RESET_SUCCESS'),
      user: updatedUser,
    };
  }
}
