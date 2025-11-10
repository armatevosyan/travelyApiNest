import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, TagQueryDto } from './tag.dto';
import { RolesGuard } from '@/common/guards/roles.guard';
import { I18nService } from 'nestjs-i18n';

@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTagDto: CreateTagDto) {
    const tag = await this.tagService.create(createTagDto);
    return {
      message: this.i18n.translate('t.TAG_CREATED_SUCCESSFULLY'),
      data: tag,
    };
  }

  @Get()
  async findAll(@Query() query: TagQueryDto) {
    const result = await this.tagService.findAll(query);
    return {
      message: this.i18n.translate('t.TAGS_RETRIEVED_SUCCESSFULLY'),
      data: result.data,
      total: result.total,
    };
  }
}
