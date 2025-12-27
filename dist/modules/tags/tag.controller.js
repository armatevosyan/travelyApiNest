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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const tag_dto_1 = require("./tag.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const nestjs_i18n_1 = require("nestjs-i18n");
let TagController = class TagController {
    tagService;
    i18n;
    constructor(tagService, i18n) {
        this.tagService = tagService;
        this.i18n = i18n;
    }
    async create(createTagDto) {
        const tag = await this.tagService.create(createTagDto);
        return {
            message: this.i18n.translate('t.TAG_CREATED_SUCCESSFULLY'),
            data: tag,
        };
    }
    async findAll(query) {
        const result = await this.tagService.findAll(query);
        return {
            message: this.i18n.translate('t.TAGS_RETRIEVED_SUCCESSFULLY'),
            data: result.data,
            total: result.total,
        };
    }
};
exports.TagController = TagController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.CreateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_dto_1.TagQueryDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findAll", null);
exports.TagController = TagController = __decorate([
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [tag_service_1.TagService,
        nestjs_i18n_1.I18nService])
], TagController);
//# sourceMappingURL=tag.controller.js.map