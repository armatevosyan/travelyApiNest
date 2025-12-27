import { FileEntity } from './file.entity';
export declare enum FileRelationType {
    USER = "user",
    PLACE = "place",
    BLOG = "blog"
}
export declare class FileRelation {
    id: number;
    fileId: number;
    file: FileEntity;
    entityType: FileRelationType;
    entityId: number;
    createdAt: Date;
}
