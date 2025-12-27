import { FilesService } from './files.service';
import { I18nService } from 'nestjs-i18n';
export declare class FilesController {
    private readonly filesService;
    private readonly i18n;
    constructor(filesService: FilesService, i18n: I18nService);
    createFile(userId: number, files: Express.Multer.File[], folder?: string): Promise<{
        message: string;
        data: import("./entities/file.entity").FileEntity | import("./entities/file.entity").FileEntity[];
    }>;
    getMyFiles(userId: number): Promise<{
        message: string;
        data: import("./entities/file.entity").FileEntity[];
        total: number;
    }>;
    deleteFile(id: number): Promise<{
        message: string;
    }>;
}
