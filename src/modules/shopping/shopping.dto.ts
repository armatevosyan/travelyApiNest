import { IsOptional, IsInt, IsString, IsArray, IsUrl } from 'class-validator';

export class CreateShoppingDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productCategories?: string[]; // e.g., ["Men's Clothing", "Groceries", "Electronics"]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  brandsCarried?: string[]; // e.g., ["Nike", "Adidas", "Apple"]

  @IsOptional()
  @IsUrl()
  onlineStoreUrl?: string;

  @IsOptional()
  @IsString()
  returnPolicy?: string;

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}

export class UpdateShoppingDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productCategories?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  brandsCarried?: string[];

  @IsOptional()
  @IsUrl()
  onlineStoreUrl?: string;

  @IsOptional()
  @IsString()
  returnPolicy?: string;

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}
