import { User } from '@/modules/users/user.entity';
import { FileRelation } from './file-relation.entity';
export declare class FileEntity {
    id: number;
    fileName: string;
    mimeType: string;
    size: number;
    bucketPath: string;
    url: string;
    userId: number | null;
    user: User | null;
    relations: FileRelation[];
    createdAt: Date;
    updatedAt: Date;
}
