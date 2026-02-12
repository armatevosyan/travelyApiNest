import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  IsUrl,
  IsObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RentalOptionsDto {
  @IsOptional()
  @IsNumber()
  perHour?: number;

  @IsOptional()
  @IsNumber()
  perDay?: number;

  @IsOptional()
  @IsNumber()
  perWeek?: number;

  @IsOptional()
  @IsNumber()
  perMonth?: number;
}

export class CreateTransportDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsString()
  operator?: string; // e.g., "Amtrak", "Greyhound"

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  transportLines?: string[]; // e.g., ["Red Line", "Route 5B"]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[]; // Array of major destinations served

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicleTypes?: string[]; // e.g., ["Sedan", "Mountain Bike", "Van"]

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RentalOptionsDto)
  rentalOptions?: {
    perHour?: number;
    perDay?: number;
    perWeek?: number;
    perMonth?: number;
  };

  @IsOptional()
  @IsUrl()
  bookingUrl?: string; // For vehicle rentals or reservations
}

export class UpdateTransportDto {
  @IsOptional()
  @IsString()
  operator?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  transportLines?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicleTypes?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RentalOptionsDto)
  rentalOptions?: {
    perHour?: number;
    perDay?: number;
    perWeek?: number;
    perMonth?: number;
  };

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}
