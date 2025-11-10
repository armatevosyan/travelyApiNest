import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsString({ message: 't.TAG_NAME_INVALID' })
  @MinLength(2, { message: 't.TAG_NAME_MIN_LENGTH' })
  @MaxLength(100, { message: 't.TAG_NAME_MAX_LENGTH' })
  name: string;

  @IsOptional()
  @IsString({ message: 't.TAG_SLUG_INVALID' })
  @MaxLength(100, { message: 't.TAG_SLUG_MAX_LENGTH' })
  slug?: string | null;
}

export class TagQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
