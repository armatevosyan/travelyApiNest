"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_s3_1 = require("@aws-sdk/client-s3");
const file_entity_1 = require("./entities/file.entity");
const file_relation_entity_1 = require("./entities/file-relation.entity");
const r2_client_1 = require("./r2.client");
const nestjs_i18n_1 = require("nestjs-i18n");
const crypto_1 = require("crypto");
let FilesService = class FilesService {
    fileRepository;
    fileRelationRepository;
    i18n;
    r2Client;
    bucketName;
    constructor(fileRepository, fileRelationRepository, i18n) {
        this.fileRepository = fileRepository;
        this.fileRelationRepository = fileRelationRepository;
        this.i18n = i18n;
        this.r2Client = (0, r2_client_1.createR2Client)();
        this.bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'travely';
    }
    generatePublicUrl(bucketPath) {
        const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
        const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN;
        if (publicDomain) {
            return `${publicDomain}/${bucketPath}`;
        }
        if (accountId) {
            return `https://pub-${accountId}.r2.dev/${bucketPath}`;
        }
        return `https://r2.dev/${bucketPath}`;
    }
    async deleteFile(id) {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
            throw new common_1.NotFoundException(this.i18n.translate('t.FILE_NOT_FOUND'));
        }
        try {
            const deleteCommand = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: file.bucketPath,
            });
            await this.r2Client.send(deleteCommand);
        }
        catch (error) {
            console.error('Error deleting file from R2:', error);
        }
        await this.fileRepository.remove(file);
    }
    async uploadFileDirectly(file, userId, folder = 'uploads') {
        const fileExtension = file.originalname.split('.').pop() || '';
        const baseFileName = file.originalname.replace(/\.[^/.]+$/, '');
        const uniqueFileName = `${baseFileName}-${(0, crypto_1.randomUUID)()}.${fileExtension}`;
        const normalizedFolder = folder.replace(/^\/+|\/+$/g, '');
        const bucketPath = normalizedFolder
            ? `${normalizedFolder}/${uniqueFileName}`
            : uniqueFileName;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: bucketPath,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await this.r2Client.send(command);
        const fileEntity = this.fileRepository.create({
            fileName: uniqueFileName,
            mimeType: file.mimetype,
            size: file.size,
            bucketPath,
            url: this.generatePublicUrl(bucketPath),
            userId: userId,
        });
        return this.fileRepository.save(fileEntity);
    }
    async findByUserId(userId) {
        return this.fileRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async attachFileToEntity(fileId, entityType, entityId) {
        const file = await this.fileRepository.findOne({ where: { id: fileId } });
        if (!file) {
            throw new common_1.NotFoundException(this.i18n.translate('t.FILE_NOT_FOUND'));
        }
        const existingRelation = await this.fileRelationRepository.findOne({
            where: { fileId, entityType, entityId },
        });
        if (existingRelation) {
            return existingRelation;
        }
        const relation = this.fileRelationRepository.create({
            fileId,
            entityType,
            entityId,
        });
        return this.fileRelationRepository.save(relation);
    }
    async detachFileFromEntity(fileId, entityType, entityId) {
        const relation = await this.fileRelationRepository.findOne({
            where: { fileId, entityType, entityId },
        });
        if (!relation) {
            return;
        }
        await this.fileRelationRepository.remove(relation);
    }
    async getFilesForEntity(entityType, entityId) {
        const relations = await this.fileRelationRepository.find({
            where: { entityType, entityId },
            relations: ['file'],
            order: { createdAt: 'DESC' },
        });
        return relations.map((relation) => relation.file);
    }
    async getFileRelationsForEntity(entityType, entityId) {
        return this.fileRelationRepository.find({
            where: { entityType, entityId },
            relations: ['file'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(file_relation_entity_1.FileRelation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], FilesService);
//# sourceMappingURL=files.service.js.map