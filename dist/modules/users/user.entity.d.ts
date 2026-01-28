import { Role } from 'modules/roles/role.entity';
import { FileEntity } from '@/modules/files/entities/file.entity';
export declare class User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    website: string;
    description: string;
    language: string;
    verifyCode: string | null;
    isActive: boolean;
    isPro: boolean;
    googleId: string | null;
    appleId: string | null;
    role: Role;
    roleId: number;
    otp: string | null;
    otpExpiration: Date | null;
    profileImage: FileEntity;
    profileImageId: number | null;
    verifiedAt: Date | null;
    deletedAt: Date | null;
    deactivatedAt: Date | null;
    notificationsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}
