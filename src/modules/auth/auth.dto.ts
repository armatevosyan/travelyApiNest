import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class EmailPasswordDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class SignInDto extends EmailPasswordDto {}

export class SignUpDto extends EmailPasswordDto {
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;
}
