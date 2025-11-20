import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  MinLength,
  MaxLength,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as placeTypes from '@/modules/places/place.types';

export class CreatePlaceDto {
  @IsNotEmpty({ message: 't.PLACE_NAME_REQUIRED' })
  @IsString({ message: 't.PLACE_NAME_INVALID' })
  @MinLength(2, { message: 't.PLACE_NAME_MIN_LENGTH' })
  @MaxLength(255, { message: 't.PLACE_NAME_MAX_LENGTH' })
  name: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_DESCRIPTION_INVALID' })
  description?: string | null;

  // Location
  @IsOptional()
  @IsString({ message: 't.PLACE_ADDRESS_INVALID' })
  @MaxLength(255, { message: 't.PLACE_ADDRESS_MAX_LENGTH' })
  address?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_COUNTRY_ID_INVALID' })
  countryId?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_STATE_ID_INVALID' })
  stateId?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_CITY_ID_INVALID' })
  cityId?: number | null;

  @IsOptional()
  @IsString({ message: 't.PLACE_POSTAL_CODE_INVALID' })
  @MaxLength(20, { message: 't.PLACE_POSTAL_CODE_MAX_LENGTH' })
  postalCode?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsLatitude({ message: 't.PLACE_LATITUDE_INVALID' })
  latitude?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsLongitude({ message: 't.PLACE_LONGITUDE_INVALID' })
  longitude?: number;

  // Contact
  @IsOptional()
  @IsString({ message: 't.PLACE_PHONE_INVALID' })
  @MaxLength(50, { message: 't.PLACE_PHONE_MAX_LENGTH' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_EMAIL_INVALID' })
  @MaxLength(255, { message: 't.PLACE_EMAIL_MAX_LENGTH' })
  email?: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_WEBSITE_INVALID' })
  @MaxLength(500, { message: 't.PLACE_WEBSITE_MAX_LENGTH' })
  website?: string;

  // Category
  @IsNotEmpty({ message: 't.PLACE_CATEGORY_REQUIRED' })
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.PLACE_CATEGORY_INVALID' })
  categoryId: number;

  // Media (File IDs)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const num = typeof v === 'string' ? parseInt(v, 10) : Number(v);
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => parseInt(v.trim(), 10))
        .filter((v) => !isNaN(v));
    }
    return null;
  })
  @IsArray({ message: 't.PLACE_IMAGE_IDS_INVALID' })
  @IsNumber({}, { each: true, message: 't.PLACE_IMAGE_IDS_INVALID' })
  imageIds?: number[] | null;

  // TODO: Need to work Opening Hours Object, validations
  // Operating Hours
  @IsOptional()
  openingHours?: placeTypes.OpeningHours;

  // Social Media
  @IsOptional()
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  };

  // SEO
  @IsOptional()
  @IsString({ message: 't.PLACE_SLUG_INVALID' })
  @MaxLength(255, { message: 't.PLACE_SLUG_MAX_LENGTH' })
  slug?: string;

  // Tags
  @IsOptional()
  @Transform(({ value }): number[] => {
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const num = Number(v);
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => {
          const num = Number(v.trim());
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    return value;
  })
  @IsArray({ message: 't.PLACE_TAG_IDS_INVALID' })
  @IsNumber({}, { each: true, message: 't.PLACE_TAG_ID_INVALID' })
  tagIds?: number[];

  @IsOptional()
  @Transform(({ value }): number[] => {
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const num = Number(v);
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => {
          const num = Number(v.trim());
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    return value;
  })
  @IsArray({ message: 't.PLACE_FACILITY_IDS_INVALID' })
  @IsNumber({}, { each: true, message: 't.PLACE_FACILITY_ID_INVALID' })
  facilityIds?: number[];

  // Pricing
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_PRICE_INVALID' })
  price?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_MIN_PRICE_INVALID' })
  minPrice?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_MAX_PRICE_INVALID' })
  maxPrice?: number | null;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 't.PLACE_IS_PRICE_ON_REQUEST_INVALID' })
  isPriceOnRequest?: boolean;
}

export class UpdatePlaceDto {
  @IsOptional()
  @IsString({ message: 't.PLACE_NAME_INVALID' })
  @MinLength(2, { message: 't.PLACE_NAME_MIN_LENGTH' })
  @MaxLength(255, { message: 't.PLACE_NAME_MAX_LENGTH' })
  name?: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_DESCRIPTION_INVALID' })
  description?: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_ADDRESS_INVALID' })
  @MaxLength(255, { message: 't.PLACE_ADDRESS_MAX_LENGTH' })
  address?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_COUNTRY_ID_INVALID' })
  countryId?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_STATE_ID_INVALID' })
  stateId?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_CITY_ID_INVALID' })
  cityId?: number | null;

  @IsOptional()
  @IsString({ message: 't.PLACE_POSTAL_CODE_INVALID' })
  @MaxLength(20, { message: 't.PLACE_POSTAL_CODE_MAX_LENGTH' })
  postalCode?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsLatitude({ message: 't.PLACE_LATITUDE_INVALID' })
  latitude?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsLongitude({ message: 't.PLACE_LONGITUDE_INVALID' })
  longitude?: number;

  @IsOptional()
  @IsString({ message: 't.PLACE_PHONE_INVALID' })
  @MaxLength(50, { message: 't.PLACE_PHONE_MAX_LENGTH' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_EMAIL_INVALID' })
  @MaxLength(255, { message: 't.PLACE_EMAIL_MAX_LENGTH' })
  email?: string;

  @IsOptional()
  @IsString({ message: 't.PLACE_WEBSITE_INVALID' })
  @MaxLength(500, { message: 't.PLACE_WEBSITE_MAX_LENGTH' })
  website?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.PLACE_CATEGORY_INVALID' })
  categoryId?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const num = typeof v === 'string' ? parseInt(v, 10) : Number(v);
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => parseInt(v.trim(), 10))
        .filter((v) => !isNaN(v));
    }
    return null;
  })
  @IsArray({ message: 't.PLACE_IMAGE_IDS_INVALID' })
  @IsNumber({}, { each: true, message: 't.PLACE_IMAGE_IDS_INVALID' })
  imageIds?: number[] | null;

  // TODO: Need to work Opening Hours Object, validations
  @IsOptional()
  openingHours?: placeTypes.OpeningHours;

  @IsOptional()
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  };

  // SEO
  @IsOptional()
  @IsString({ message: 't.PLACE_SLUG_INVALID' })
  @MaxLength(255, { message: 't.PLACE_SLUG_MAX_LENGTH' })
  slug?: string;

  // Tags
  @IsOptional()
  @Transform(({ value }): number[] => {
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const num = Number(v);
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => {
          const num = Number(v.trim());
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    return value;
  })
  @IsArray({ message: 't.PLACE_TAG_IDS_INVALID' })
  @IsNumber({}, { each: true, message: 't.PLACE_TAG_ID_INVALID' })
  tagIds?: number[];

  @IsOptional()
  @Transform(({ value }): number[] => {
    if (Array.isArray(value)) {
      return value
        .map((v) => {
          const num = Number(v);
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((v) => {
          const num = Number(v.trim());
          return isNaN(num) ? null : num;
        })
        .filter((v) => v !== null);
    }
    return value;
  })
  @IsArray({ message: 't.PLACE_FACILITY_IDS_INVALID' })
  @IsNumber({}, { each: true, message: 't.PLACE_FACILITY_ID_INVALID' })
  facilityIds?: number[];

  // Pricing
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_PRICE_INVALID' })
  price?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_MIN_PRICE_INVALID' })
  minPrice?: number | null;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_MAX_PRICE_INVALID' })
  maxPrice?: number | null;

  @IsOptional()
  @IsString({ message: 't.PLACE_PRICE_TYPE_INVALID' })
  priceType?: string | null; // 'range', 'fixed', 'onRequest', 'free', 'discounted'

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  })
  @IsNumber({}, { message: 't.PLACE_OLD_PRICE_INVALID' })
  oldPrice?: number | null;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 't.PLACE_IS_PRICE_ON_REQUEST_INVALID' })
  isPriceOnRequest?: boolean;
}

export class PlaceQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  userId?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  cityId?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  countryId?: number;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 't.PLACE_IS_ACTIVE_INVALID' })
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isFeatured?: boolean;

  // Price filtering
  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.PLACE_MIN_PRICE_FILTER_INVALID' })
  minPrice?: number; // Filter places with price >= minPrice

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 't.PLACE_MAX_PRICE_FILTER_INVALID' })
  maxPrice?: number; // Filter places with price <= maxPrice

  @IsOptional()
  @Transform(({ value }): boolean => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 't.PLACE_IS_PRICE_ON_REQUEST_FILTER_INVALID' })
  isPriceOnRequest?: boolean; // Filter places where price is on request

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  limit?: number;
}
