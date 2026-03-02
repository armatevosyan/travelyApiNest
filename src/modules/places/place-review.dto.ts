import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePlaceReviewDto {
  @IsNotEmpty({ message: 't.REVIEW_RATING_REQUIRED' })
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isFinite(num) ? num : value;
  })
  @IsNumber({}, { message: 't.REVIEW_RATING_INVALID' })
  @Min(1, { message: 't.REVIEW_RATING_MIN' })
  @Max(5, { message: 't.REVIEW_RATING_MAX' })
  rating: number;

  @IsOptional()
  @IsString({ message: 't.REVIEW_COMMENT_INVALID' })
  @MaxLength(2000, { message: 't.REVIEW_COMMENT_MAX_LENGTH' })
  comment?: string | null;
}

export class PlaceReviewQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isFinite(num) ? num : undefined;
  })
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isFinite(num) ? num : undefined;
  })
  @IsNumber()
  limit?: number;
}
