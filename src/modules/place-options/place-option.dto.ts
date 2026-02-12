import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { PlaceOptionType, PlaceOptionCategory } from './place-option-type';

export class PlaceOptionQueryDto {
  @IsOptional()
  @IsEnum(PlaceOptionType)
  entityType?: PlaceOptionType;

  @IsOptional()
  @IsEnum(PlaceOptionCategory)
  category?: PlaceOptionCategory;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    return value === 'true' || value === true;
  })
  @IsBoolean()
  isActive?: boolean;
}
