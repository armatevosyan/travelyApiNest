import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { FileEntity } from './entities/file.entity';
import {
  FileRelation,
  FileRelationType,
} from './entities/file-relation.entity';
import { createR2Client } from './r2.client';
import { I18nService } from 'nestjs-i18n';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesService {
  private readonly r2Client: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    @InjectRepository(FileRelation)
    private readonly fileRelationRepository: Repository<FileRelation>,
    private readonly i18n: I18nService,
  ) {
    this.r2Client = createR2Client();
    this.bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'travely';
  }

  /**
   * Generate public URL for a file
   */
  generatePublicUrl(bucketPath: string): string {
    const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN;

    // If custom domain is configured, use it
    if (publicDomain) {
      return `https://${publicDomain}/${bucketPath}`;
    }

    // Otherwise use R2 public URL format
    if (accountId) {
      return `https://pub-${accountId}.r2.dev/${bucketPath}`;
    }

    // Fallback (should not happen in production)
    return `https://r2.dev/${bucketPath}`;
  }

  /**
   * Delete file from R2 and database
   */
  async deleteFile(id: number): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(this.i18n.translate('t.FILE_NOT_FOUND'));
    }

    try {
      // Delete from R2
      const deleteCommand = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: file.bucketPath,
      });

      await this.r2Client.send(deleteCommand);
    } catch (error) {
      // Log error but continue with database deletion
      console.error('Error deleting file from R2:', error);
    }

    // Delete from database
    await this.fileRepository.remove(file);
  }

  /**
   * Upload file directly to R2 and create database record
   * Handles the entire upload process server-side
   */
  async uploadFileDirectly(
    file: Express.Multer.File,
    userId: number,
    folder: string = 'uploads',
  ): Promise<FileEntity> {
    // Generate unique file name
    const fileExtension = file.originalname.split('.').pop() || '';
    const baseFileName = file.originalname.replace(/\.[^/.]+$/, '');
    const uniqueFileName = `${baseFileName}-${randomUUID()}.${fileExtension}`;

    // Construct bucket path
    const normalizedFolder = folder.replace(/^\/+|\/+$/g, '');
    const bucketPath = normalizedFolder
      ? `${normalizedFolder}/${uniqueFileName}`
      : uniqueFileName;

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: bucketPath,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.r2Client.send(command);

    // Create database record
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

  /**
   * Get all files uploaded by a specific user
   */
  async findByUserId(userId: number): Promise<FileEntity[]> {
    return this.fileRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Attach a file to an entity (place, blog, user, etc.)
   */
  async attachFileToEntity(
    fileId: number,
    entityType: FileRelationType,
    entityId: number,
  ): Promise<FileRelation> {
    // Check if file exists
    const file = await this.fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException(this.i18n.translate('t.FILE_NOT_FOUND'));
    }

    // Check if relation already exists
    const existingRelation = await this.fileRelationRepository.findOne({
      where: { fileId, entityType, entityId },
    });

    if (existingRelation) {
      return existingRelation; // Return existing relation instead of throwing error
    }

    // Create relation
    const relation = this.fileRelationRepository.create({
      fileId,
      entityType,
      entityId,
    });

    return this.fileRelationRepository.save(relation);
  }

  /**
   * Detach a file from an entity
   */
  async detachFileFromEntity(
    fileId: number,
    entityType: FileRelationType,
    entityId: number,
  ): Promise<void> {
    const relation = await this.fileRelationRepository.findOne({
      where: { fileId, entityType, entityId },
    });

    if (!relation) {
      return; // Silently return if relation doesn't exist
    }

    await this.fileRelationRepository.remove(relation);
  }

  /**
   * Get all files attached to a specific entity
   */
  async getFilesForEntity(
    entityType: FileRelationType,
    entityId: number,
  ): Promise<FileEntity[]> {
    const relations = await this.fileRelationRepository.find({
      where: { entityType, entityId },
      relations: ['file'],
      order: { createdAt: 'DESC' },
    });

    return relations.map((relation) => relation.file);
  }

  /**
   * Get all file relations for a specific entity
   */
  async getFileRelationsForEntity(
    entityType: FileRelationType,
    entityId: number,
  ): Promise<FileRelation[]> {
    return this.fileRelationRepository.find({
      where: { entityType, entityId },
      relations: ['file'],
      order: { createdAt: 'DESC' },
    });
  }
}
