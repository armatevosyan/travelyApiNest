import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { FileRelation, FileRelationType } from './entities/file-relation.entity';
import { I18nService } from 'nestjs-i18n';
export declare class FilesService {
    private readonly fileRepository;
    private readonly fileRelationRepository;
    private readonly i18n;
    private readonly r2Client;
    private readonly bucketName;
    constructor(fileRepository: Repository<FileEntity>, fileRelationRepository: Repository<FileRelation>, i18n: I18nService);
    generatePublicUrl(bucketPath: string): string;
    deleteFile(id: number): Promise<void>;
    uploadFileDirectly(file: Express.Multer.File, userId: number, folder?: string): Promise<FileEntity>;
    findByUserId(userId: number): Promise<FileEntity[]>;
    attachFileToEntity(fileId: number, entityType: FileRelationType, entityId: number): Promise<FileRelation>;
    detachFileFromEntity(fileId: number, entityType: FileRelationType, entityId: number): Promise<void>;
    getFilesForEntity(entityType: FileRelationType, entityId: number): Promise<FileEntity[]>;
    getFileRelationsForEntity(entityType: FileRelationType, entityId: number): Promise<FileRelation[]>;
}
