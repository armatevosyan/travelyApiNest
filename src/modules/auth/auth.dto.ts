import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

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
