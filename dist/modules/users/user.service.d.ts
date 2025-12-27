import { Repository } from 'typeorm';
import { User } from './user.entity';
import { FilesService } from '@/modules/files/files.service';
import { SignupData } from '@/modules/auth/auth.types';
export declare class UserService {
    private readonly userRepo;
    private readonly filesService;
    constructor(userRepo: Repository<User>, filesService: FilesService);
    create(data: SignupData): Promise<{
        id: number;
        role: import("../roles/role.entity").Role;
        email: string;
        fullName: string;
    }>;
    private createBaseQueryBuilder;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, data: Partial<User>): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateProfileImage(userId: number, file: Express.Multer.File): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    runUserData(user: User | null): {
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
        createdAt: Date;
        updatedAt: Date;
    } | null;
}
