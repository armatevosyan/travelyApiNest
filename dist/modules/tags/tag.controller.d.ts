import { TagService } from './tag.service';
import { CreateTagDto, TagQueryDto } from './tag.dto';
import { I18nService } from 'nestjs-i18n';
export declare class TagController {
    private readonly tagService;
    private readonly i18n;
    constructor(tagService: TagService, i18n: I18nService);
    create(createTagDto: CreateTagDto): Promise<{
        message: string;
        data: import("./tag.entity").Tag;
    }>;
    findAll(query: TagQueryDto): Promise<{
        message: string;
        data: import("./tag.entity").Tag[];
        total: number;
    }>;
}
