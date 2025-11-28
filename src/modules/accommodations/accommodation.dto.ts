import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  IsUrl,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RoomTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  photos?: number[]; // File IDs
}

export class CreateAccommodationDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomTypeDto)
  roomTypes?: RoomTypeDto[];

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;

  @IsOptional()
  @IsString()
  checkInTime?: string; // '14:00'

  @IsOptional()
  @IsString()
  checkOutTime?: string; // '11:00'
}

export class UpdateAccommodationDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomTypeDto)
  roomTypes?: RoomTypeDto[];

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;

  @IsOptional()
  @IsString()
  checkInTime?: string;

  @IsOptional()
  @IsString()
  checkOutTime?: string;
}
