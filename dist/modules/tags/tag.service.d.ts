import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto, TagQueryDto } from './tag.dto';
import { I18nService } from 'nestjs-i18n';
export declare class TagService {
    private readonly tagRepo;
    private readonly i18n;
    constructor(tagRepo: Repository<Tag>, i18n: I18nService);
    private generateSlug;
    create(createTagDto: CreateTagDto): Promise<Tag>;
    findAll(query?: TagQueryDto): Promise<{
        data: Tag[];
        total: number;
    }>;
    findOne(id: number): Promise<Tag>;
}
