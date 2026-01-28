import { UserService } from './user.service';
import { User as IUser } from '@/modules/users/user.entity';
import { ERoles } from '@/modules/roles/role.types';
import { AuthService } from '@/modules/auth/auth.service';
import { I18nService } from 'nestjs-i18n';
import { ChangePasswordDto } from '@/modules/auth/auth.dto';
import { UpdateProfileDto, UpdateNotificationSettingDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    private readonly i18n;
    constructor(userService: UserService, authService: AuthService, i18n: I18nService);
    me(user: IUser, role: ERoles): {
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
    updateProfile(user: IUser, data: UpdateProfileDto): Promise<{
        message: string;
        data: {
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
    updateProfileImage(user: IUser, file: Express.Multer.File): Promise<{
        message: string;
        data: {
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
    changePassword(data: ChangePasswordDto, user: IUser): Promise<{
        message: string;
    }>;
    deactivateAccount(user: IUser): Promise<{
        message: string;
    }>;
    updateNotificationSetting(user: IUser, data: UpdateNotificationSettingDto): Promise<{
        message: string;
        data: {
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
