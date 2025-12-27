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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_decorators_1 = require("../../common/decorators/user.decorators");
const nestjs_i18n_1 = require("nestjs-i18n");
let FilesController = class FilesController {
    filesService;
    i18n;
    constructor(filesService, i18n) {
        this.filesService = filesService;
        this.i18n = i18n;
    }
    async createFile(userId, files, folder) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException(this.i18n.translate('t.FILE_REQUIRED'));
        }
        const uploadFolder = folder || 'uploads';
        const uploadedFiles = await Promise.all(files.map((file) => this.filesService.uploadFileDirectly(file, userId, uploadFolder)));
        return {
            message: this.i18n.translate('t.FILE_UPLOADED_SUCCESSFULLY'),
            data: uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles,
        };
    }
    async getMyFiles(userId) {
        const files = await this.filesService.findByUserId(userId);
        return {
            message: this.i18n.translate('t.FILES_RETRIEVED_SUCCESSFULLY'),
            data: files,
            total: files.length,
        };
    }
    async deleteFile(id) {
        if (!+id) {
            throw new common_1.BadRequestException('There is no id for this file');
        }
        await this.filesService.deleteFile(id);
        return {
            message: this.i18n.translate('t.FILE_DELETED_SUCCESSFULLY'),
        };
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, user_decorators_1.User)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Query)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "createFile", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorators_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getMyFiles", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "deleteFile", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        nestjs_i18n_1.I18nService])
], FilesController);
//# sourceMappingURL=files.controller.js.map