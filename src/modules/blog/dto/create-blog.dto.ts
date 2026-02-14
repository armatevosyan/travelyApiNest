import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @IsNotEmpty({ message: 't.BLOG_TITLE_REQUIRED' })
  @IsString({ message: 't.BLOG_TITLE_INVALID' })
  @MinLength(2, { message: 't.BLOG_TITLE_MIN_LENGTH' })
  @MaxLength(255, { message: 't.BLOG_TITLE_MAX_LENGTH' })
  title: string;

  @IsNotEmpty({ message: 't.BLOG_DESCRIPTION_REQUIRED' })
  @IsString({ message: 't.BLOG_DESCRIPTION_INVALID' })
  description?: string;

  @IsNotEmpty({ message: 't.BLOG_CATEGORY_REQUIRED' })
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.BLOG_CATEGORY_INVALID' })
  categoryId: number;

  @IsOptional()
  @IsString({ message: 't.BLOG_IMAGE_INVALID' })
  @MaxLength(500, { message: 't.BLOG_IMAGE_MAX_LENGTH' })
  image?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    if (Array.isArray(value)) {
      return value.map((v) => Number(v)).filter((n) => !isNaN(n));
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => Number(v.trim()))
        .filter((n) => !isNaN(n));
    }
    return undefined;
  })
  @IsArray({ message: 't.BLOG_IMAGE_IDS_INVALID' })
  @ArrayMinSize(2, { message: 't.BLOG_MIN_IMAGES_REQUIRED' })
  @IsInt({ each: true, message: 't.BLOG_IMAGE_ID_INVALID' })
  imageIds?: number[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.BLOG_FILE_ID_INVALID' })
  fileId?: number;
}
