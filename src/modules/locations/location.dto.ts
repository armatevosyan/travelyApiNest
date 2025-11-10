import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { LocationType } from './location.entity';

export class LocationQueryDto {
  @IsOptional()
  @IsEnum(LocationType, { message: 't.LOCATION_TYPE_INVALID' })
  type?: LocationType;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === undefined) return undefined;
    if (value === 'null' || value === null) return null;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 't.LOCATION_PARENT_ID_INVALID' })
  parentId?: number | null;

  @IsOptional()
  @IsString()
  search?: string;
}
