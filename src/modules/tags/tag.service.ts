import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto, TagQueryDto } from './tag.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    private readonly i18n: I18nService,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    let slug = createTagDto.slug;
    if (!slug && createTagDto.name) {
      slug = this.generateSlug(createTagDto.name);
    }

    const existingTag = await this.tagRepo.findOne({
      where: [{ name: createTagDto.name }, ...(slug ? [{ slug }] : [])],
    });

    if (existingTag) {
      throw new BadRequestException(
        this.i18n.translate('t.TAG_ALREADY_EXISTS'),
      );
    }

    const tag = this.tagRepo.create({
      ...createTagDto,
      slug,
    });

    return this.tagRepo.save(tag);
  }

  async findAll(
    query: TagQueryDto = {},
  ): Promise<{ data: Tag[]; total: number }> {
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

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepo.findOne({
      where: { id },
      relations: ['places'],
    });

    if (!tag) {
      throw new NotFoundException(this.i18n.translate('t.TAG_NOT_FOUND'));
    }

    return tag;
  }
}
