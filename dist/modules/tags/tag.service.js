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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
const nestjs_i18n_1 = require("nestjs-i18n");
let TagService = class TagService {
    tagRepo;
    i18n;
    constructor(tagRepo, i18n) {
        this.tagRepo = tagRepo;
        this.i18n = i18n;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    async create(createTagDto) {
        let slug = createTagDto.slug;
        if (!slug && createTagDto.name) {
            slug = this.generateSlug(createTagDto.name);
        }
        const existingTag = await this.tagRepo.findOne({
            where: [{ name: createTagDto.name }, ...(slug ? [{ slug }] : [])],
        });
        if (existingTag) {
            throw new common_1.BadRequestException(this.i18n.translate('t.TAG_ALREADY_EXISTS'));
        }
        const tag = this.tagRepo.create({
            ...createTagDto,
            slug,
        });
        return this.tagRepo.save(tag);
    }
    async findAll(query = {}) {
        const { search } = query;
        const queryBuilder = this.tagRepo.createQueryBuilder('tag');
        if (search) {
            queryBuilder.andWhere('tag.name ILIKE :search', {
                search: `%${search}%`,
            });
        }
        queryBuilder.orderBy('tag.name', 'ASC');
        const [data, total] = await queryBuilder.getManyAndCount();
        return { data, total };
    }
    async findOne(id) {
        const tag = await this.tagRepo.findOne({
            where: { id },
            relations: ['places'],
        });
        if (!tag) {
            throw new common_1.NotFoundException(this.i18n.translate('t.TAG_NOT_FOUND'));
        }
        return tag;
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        nestjs_i18n_1.I18nService])
], TagService);
//# sourceMappingURL=tag.service.js.map