export declare class EmailPasswordDto {
    email: string;
    password: string;
}
export declare class SignInDto extends EmailPasswordDto {
}
export declare class SignUpDto extends EmailPasswordDto {
    fullName: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class VerifyOtpDto {
    email: string;
    code: string;
}
export declare class ResetPasswordDto {
    email: string;
    code: string;
    newPassword: string;
}
export declare class ChangePasswordDto {
    password: string;
}
