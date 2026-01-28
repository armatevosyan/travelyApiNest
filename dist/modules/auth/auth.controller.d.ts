import { I18nService } from 'nestjs-i18n';
import { AuthService } from './auth.service';
import { UserService } from 'modules/users/user.service';
import { RoleService } from 'modules/roles/role.service';
import { SignInDto, SignUpDto, ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto } from './auth.dto';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly roleService;
    private readonly i18n;
    constructor(userService: UserService, authService: AuthService, roleService: RoleService, i18n: I18nService);
    signUp(data: SignUpDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            isActive: boolean;
        };
    }>;
    signIn(data: SignInDto): Promise<{
        user: {
            id: number;
            fullName: string;
            email: string;
            profileImage: import("../files/entities/file.entity").FileEntity;
            phone: string;
            website: string;
            role: import("../roles/role.entity").Role;
            description: string;
            language: string;
            isActive: boolean;
            verifiedAt: Date | null;
            notificationsEnabled: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        token: string;
    }>;
    verifyEmail(data: {
        email: string;
        code: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            fullName: string;
            email: string;
            profileImage: import("../files/entities/file.entity").FileEntity;
            phone: string;
            website: string;
            role: import("../roles/role.entity").Role;
            description: string;
            language: string;
            isActive: boolean;
            verifiedAt: Date | null;
            notificationsEnabled: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        token: string;
    }>;
    resendVerification(data: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    forgotPassword(data: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyOtp(data: VerifyOtpDto): Promise<{
        message: string;
        user: {
            id: number;
            fullName: string;
            email: string;
            profileImage: import("../files/entities/file.entity").FileEntity;
            phone: string;
            website: string;
            role: import("../roles/role.entity").Role;
            description: string;
            language: string;
            isActive: boolean;
            verifiedAt: Date | null;
            notificationsEnabled: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        token: string;
        success: boolean;
    }>;
    resetPassword(data: ResetPasswordDto): Promise<{
        message: string;
        user: {
            id: number;
            fullName: string;
            email: string;
            profileImage: import("../files/entities/file.entity").FileEntity;
            phone: string;
            website: string;
            role: import("../roles/role.entity").Role;
            description: string;
            language: string;
            isActive: boolean;
            verifiedAt: Date | null;
            notificationsEnabled: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
}
