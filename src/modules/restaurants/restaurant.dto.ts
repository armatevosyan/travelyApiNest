import { IsOptional, IsInt, IsString, IsArray } from 'class-validator';

export class CreateRestaurantDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  menuImageIds?: number[]; // Accept as IDs, will convert to relations

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  dishImageIds?: number[]; // Accept as IDs, will convert to relations

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cuisineTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryOptions?: string[];
}

export class UpdateRestaurantDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  menuImageIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  dishImageIds?: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cuisineTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryOptions?: string[];
}
