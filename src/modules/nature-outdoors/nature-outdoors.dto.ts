import { IsOptional, IsInt, IsString, IsArray } from 'class-validator';

export class CreateNatureOutdoorsDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsString()
  entryFee?: string; // e.g., "Free", "$10 per person"

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyActivities?: string[]; // e.g., ["Hiking", "Swimming", "Picnicking"]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rules?: string[]; // e.g., ["Pets on leash", "No open fires"]

  @IsOptional()
  @IsString()
  bestTimeToVisit?: string; // e.g., "Spring for blooms", "Sunrise"

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyExhibits?: string[]; // e.g., ["Panda Enclosure", "Rose Garden"]
}

export class UpdateNatureOutdoorsDto {
  @IsOptional()
  @IsString()
  entryFee?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyActivities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rules?: string[];

  @IsOptional()
  @IsString()
  bestTimeToVisit?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyExhibits?: string[];
}
