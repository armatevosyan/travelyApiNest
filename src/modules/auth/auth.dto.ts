import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsIn,
  IsOptional,
} from 'class-validator';
import { EAuthProvider } from './auth.types';

export class SocialLoginDto {
  @IsIn([EAuthProvider.GOOGLE, EAuthProvider.APPLE], {
    message: 't.INVALID_PROVIDER',
  })
  provider: EAuthProvider.GOOGLE | EAuthProvider.APPLE;

  @IsNotEmpty({ message: 't.PROVIDER_ID_REQUIRED' })
  @IsString()
  providerId: string;

  @IsOptional()
  @IsEmail({}, { message: 't.EMAIL_INVALID' })
  email?: string | null;

  @IsOptional()
  @IsString()
  name?: string | null;
}

export class EmailPasswordDto {
  @IsEmail({}, { message: 't.EMAIL_INVALID' })
  email: string;

  @IsNotEmpty({ message: 't.PASSWORD_REQUIRED' })
  @MinLength(6, { message: 't.PASSWORD_MIN_LENGTH' })
  password: string;
}

export class SignInDto extends EmailPasswordDto {}

export class SignUpDto extends EmailPasswordDto {
  @IsNotEmpty({ message: 't.FULL_NAME_REQUIRED' })
  fullName: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 't.EMAIL_INVALID' })
  email: string;
}

export class VerifyOtpDto {
  @IsEmail({}, { message: 't.EMAIL_INVALID' })
  email: string;

  @IsNotEmpty({ message: 't.RESET_TOKEN_REQUIRED' })
  @IsString({ message: 't.RESET_TOKEN_INVALID' })
  code: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: 't.EMAIL_INVALID' })
  email: string;

  @IsNotEmpty({ message: 't.RESET_TOKEN_REQUIRED' })
  @IsString({ message: 't.RESET_TOKEN_INVALID' })
  code: string;

  @IsNotEmpty({ message: 't.NEW_PASSWORD_REQUIRED' })
  @MinLength(6, { message: 't.PASSWORD_MIN_LENGTH' })
  newPassword: string;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 't.NEW_PASSWORD_REQUIRED' })
  @MinLength(6, { message: 't.PASSWORD_MIN_LENGTH' })
  password: string;
}
