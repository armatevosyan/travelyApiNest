import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  IsUrl,
  IsObject,
} from 'class-validator';

export class CreateEntertainmentDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsString()
  eventSchedule?: string; // A URL or structured data for current and upcoming shows/events

  @IsOptional()
  @IsObject()
  ticketPrice?: Record<string, any>; // e.g., {"adult": 20, "child": 10}

  @IsOptional()
  @IsUrl()
  ticketBookingUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  currentExhibits?: string[]; // For museums, a list of current special exhibits

  @IsOptional()
  @IsString()
  ageRestriction?: string;
}

export class UpdateEntertainmentDto {
  @IsOptional()
  @IsString()
  eventSchedule?: string;

  @IsOptional()
  @IsObject()
  ticketPrice?: Record<string, any>;

  @IsOptional()
  @IsUrl()
  ticketBookingUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  currentExhibits?: string[];

  @IsOptional()
  @IsString()
  ageRestriction?: string;
}
