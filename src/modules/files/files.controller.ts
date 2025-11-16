import {
  Controller,
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
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { RolesGuard } from '@/common/guards/roles.guard';
import { I18nService } from 'nestjs-i18n';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseInterceptors(AnyFilesInterceptor()) // Accepts any field name
  @HttpCode(HttpStatus.CREATED)
  async createFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException(this.i18n.translate('t.FILE_REQUIRED'));
    }

    // Get folder from query param or default
    const uploadFolder = folder || 'uploads';

    // Upload all files
    const uploadedFiles = await Promise.all(
      files.map((file) =>
        this.filesService.uploadFileDirectly(file, uploadFolder),
      ),
    );

    return {
      message: this.i18n.translate('t.FILE_UPLOADED_SUCCESSFULLY'),
      data: uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles,
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
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
