import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  IsUrl,
  IsObject,
  IsBoolean,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EquipmentItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  priceUnit?: string; // "per_hour", "per_day", "per_week"
}

class EquipmentRentalDto {
  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipmentItemDto)
  items?: {
    name: string;
    price?: number;
    priceUnit?: string;
  }[];
}

class GuidedTourDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  duration?: string; // e.g., "2 hours", "Half day", "Full day"

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

class GuidedToursDto {
  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GuidedTourDto)
  tours?: {
    name: string;
    duration?: string;
    price?: number;
    description?: string;
  }[];
}

class TrailInformationDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  difficulty?: string[]; // e.g., ["Easy", "Moderate", "Difficult"]

  @IsOptional()
  @IsNumber()
  totalLength?: number; // in kilometers or miles

  @IsOptional()
  @IsNumber()
  elevationGain?: number;

  @IsOptional()
  @IsString()
  estimatedTime?: string;
}

class PermitsRequiredDto {
  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  types?: string[]; // e.g., ["Camping Permit", "Fishing License", "Park Entry"]

  @IsOptional()
  @IsString()
  whereToObtain?: string;

  @IsOptional()
  @IsNumber()
  cost?: number;
}

class CampingOptionsDto {
  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsNumber()
  sites?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  facilities?: string[]; // e.g., ["Restrooms", "Fire Pits", "Picnic Tables", "Water Access"]

  @IsOptional()
  @IsBoolean()
  reservationRequired?: boolean;
}

export class CreateNatureOutdoorsDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activitiesOffered?: string[]; // e.g., ["Hiking", "Camping", "Fishing"]

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => EquipmentRentalDto)
  equipmentRental?: {
    available: boolean;
    items?: {
      name: string;
      price?: number;
      priceUnit?: string;
    }[];
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GuidedToursDto)
  guidedTours?: {
    available: boolean;
    tours?: {
      name: string;
      duration?: string;
      price?: number;
      description?: string;
    }[];
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TrailInformationDto)
  trailInformation?: {
    difficulty?: string[];
    totalLength?: number;
    elevationGain?: number;
    estimatedTime?: string;
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PermitsRequiredDto)
  permitsRequired?: {
    required: boolean;
    types?: string[];
    whereToObtain?: string;
    cost?: number;
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bestSeason?: string[]; // e.g., ["Spring", "Summer", "Fall"]

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CampingOptionsDto)
  campingOptions?: {
    available: boolean;
    sites?: number;
    facilities?: string[];
    reservationRequired?: boolean;
  };

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}

export class UpdateNatureOutdoorsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activitiesOffered?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => EquipmentRentalDto)
  equipmentRental?: {
    available: boolean;
    items?: {
      name: string;
      price?: number;
      priceUnit?: string;
    }[];
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => GuidedToursDto)
  guidedTours?: {
    available: boolean;
    tours?: {
      name: string;
      duration?: string;
      price?: number;
      description?: string;
    }[];
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TrailInformationDto)
  trailInformation?: {
    difficulty?: string[];
    totalLength?: number;
    elevationGain?: number;
    estimatedTime?: string;
  };

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PermitsRequiredDto)
  permitsRequired?: {
    required: boolean;
    types?: string[];
    whereToObtain?: string;
    cost?: number;
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bestSeason?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CampingOptionsDto)
  campingOptions?: {
    available: boolean;
    sites?: number;
    facilities?: string[];
    reservationRequired?: boolean;
  };

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}
