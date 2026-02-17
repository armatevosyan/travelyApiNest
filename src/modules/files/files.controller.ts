import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { RolesGuard } from '@/common/guards/roles.guard';
import { User } from '@/common/decorators/user.decorators';
import { I18nService } from 'nestjs-i18n';
import type { MulterFile } from '@/types/upload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '@/modules/users/user.entity';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly i18n: I18nService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(HttpStatus.CREATED)
  async createFile(
    @User('id') userId: number,
    @UploadedFiles() files: MulterFile[],
    @Query('folder') folder?: string,
  ) {
    const normalizedUserId = Number(userId);
    if (!Number.isInteger(normalizedUserId) || normalizedUserId <= 0) {
      throw new UnauthorizedException(this.i18n.translate('t.UNAUTHORIZED'));
    }

    if (!files || files.length === 0) {
      throw new BadRequestException(this.i18n.translate('t.FILE_REQUIRED'));
    }

    const uploadFolder = folder || 'uploads';

    const uploadedFiles = await Promise.all(
      files.map((file) =>
        this.filesService.uploadFileDirectly(
          file,
          normalizedUserId,
          uploadFolder,
        ),
      ),
    );

    if (
      uploadFolder === 'user' &&
      uploadedFiles.length === 1 &&
      typeof files?.[0]?.mimetype === 'string' &&
      files[0].mimetype.startsWith('image/')
    ) {
      await this.userRepository.update(normalizedUserId, {
        profileImageId: uploadedFiles[0].id,
      });
    }

    return {
      message: this.i18n.translate('t.FILE_UPLOADED_SUCCESSFULLY'),
      data: uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles,
    };
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async getMyFiles(@User('id') userId: number) {
    const files = await this.filesService.findByUserId(userId);
    return {
      message: this.i18n.translate('t.FILES_RETRIEVED_SUCCESSFULLY'),
      data: files,
      total: files.length,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Param('id') id: number) {
    if (!+id) {
      throw new BadRequestException('There is no id for this file');
    }

    await this.filesService.deleteFile(id);
    return {
      message: this.i18n.translate('t.FILE_DELETED_SUCCESSFULLY'),
    };
  }
}
