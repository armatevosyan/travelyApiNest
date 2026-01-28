import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RestaurantSpecialDishDto {
  @IsInt()
  imageId: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}

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
  @ValidateNested({ each: true })
  @Type(() => RestaurantSpecialDishDto)
  specialDishes?: RestaurantSpecialDishDto[];

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
  @ValidateNested({ each: true })
  @Type(() => RestaurantSpecialDishDto)
  specialDishes?: RestaurantSpecialDishDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cuisineTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryOptions?: string[];
}
