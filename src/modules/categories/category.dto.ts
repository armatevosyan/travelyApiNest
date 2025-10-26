import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 't.CATEGORY_NAME_REQUIRED' })
  @IsString({ message: 't.CATEGORY_NAME_INVALID' })
  @MinLength(2, { message: 't.CATEGORY_NAME_MIN_LENGTH' })
  @MaxLength(50, { message: 't.CATEGORY_NAME_MAX_LENGTH' })
  name: string;

  @IsOptional()
  @IsString({ message: 't.CATEGORY_DESCRIPTION_INVALID' })
  @MaxLength(500, { message: 't.CATEGORY_DESCRIPTION_MAX_LENGTH' })
  description?: string;

  @IsOptional()
  @IsString({ message: 't.CATEGORY_ICON_INVALID' })
  @MaxLength(100, { message: 't.CATEGORY_ICON_MAX_LENGTH' })
  icon?: string;

  @IsOptional()
  @IsString({ message: 't.CATEGORY_COLOR_INVALID' })
  @MaxLength(20, { message: 't.CATEGORY_COLOR_MAX_LENGTH' })
  color?: string;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 't.CATEGORY_IS_ACTIVE_INVALID' })
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.CATEGORY_SORT_ORDER_INVALID' })
  sortOrder?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (
      value === '' ||
      value === 'null' ||
      value === null ||
      value === undefined
    )
      return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.CATEGORY_PARENT_ID_INVALID' })
  parentId?: number | null;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 't.CATEGORY_NAME_INVALID' })
  @MinLength(2, { message: 't.CATEGORY_NAME_MIN_LENGTH' })
  @MaxLength(50, { message: 't.CATEGORY_NAME_MAX_LENGTH' })
  name?: string;

  @IsOptional()
  @IsString({ message: 't.CATEGORY_DESCRIPTION_INVALID' })
  @MaxLength(500, { message: 't.CATEGORY_DESCRIPTION_MAX_LENGTH' })
  description?: string;

  @IsOptional()
  @IsString({ message: 't.CATEGORY_ICON_INVALID' })
  @MaxLength(100, { message: 't.CATEGORY_ICON_MAX_LENGTH' })
  icon?: string;

  @IsOptional()
  @IsString({ message: 't.CATEGORY_COLOR_INVALID' })
  @MaxLength(20, { message: 't.CATEGORY_COLOR_MAX_LENGTH' })
  color?: string;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 't.CATEGORY_IS_ACTIVE_INVALID' })
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.CATEGORY_SORT_ORDER_INVALID' })
  sortOrder?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (
      value === '' ||
      value === 'null' ||
      value === null ||
      value === undefined
    )
      return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.CATEGORY_PARENT_ID_INVALID' })
  parentId?: number | null;
}

export class CategoryQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (
      value === '' ||
      value === 'null' ||
      value === null ||
      value === undefined
    )
      return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber()
  parentId?: number | null;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  onlyParents?: boolean;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  onlyChildren?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  limit?: number;
}
