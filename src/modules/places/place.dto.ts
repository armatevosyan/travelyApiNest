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

  // Restaurant-specific data (optional, only for restaurant category)
  @IsOptional()
  restaurantData?: {
    menuImageIds?: number[];
    dishImageIds?: number[];
    cuisineTypes?: string[];
    dietaryOptions?: string[];
  };

  // Accommodation-specific data (optional, only for accommodation category)
  @IsOptional()
  accommodationData?: {
    roomTypes?: {
      name: string;
      description?: string;
      capacity: number;
      photos?: number[]; // File IDs
    }[];
    bookingUrl?: string;
    checkInTime?: string; // '14:00'
    checkOutTime?: string; // '11:00'
  };

  // Shopping-specific data (optional, only for shopping category)
  @IsOptional()
  shoppingData?: {
    productCategories?: string[]; // e.g., ["Men's Clothing", "Groceries", "Electronics"]
    brandsCarried?: string[]; // e.g., ["Nike", "Adidas", "Apple"]
    onlineStoreUrl?: string;
    returnPolicy?: string;
    bookingUrl?: string; // For vehicle rentals or reservations
  };

  // Transport-specific data (optional, only for transport category)
  @IsOptional()
  transportData?: {
    operator?: string; // e.g., "Amtrak", "Greyhound"
    transportLines?: string[]; // e.g., ["Red Line", "Route 5B"]
    destinations?: string[]; // Array of major destinations served
    vehicleTypes?: string[]; // For Rentals: e.g., ["Sedan", "Mountain Bike", "Van"]
    rentalOptions?: {
      perHour?: number;
      perDay?: number;
      perWeek?: number;
      perMonth?: number;
    };
    bookingUrl?: string; // For vehicle rentals or reservations
  };

  // Health & Wellness-specific data (optional, only for health & wellness category)
  @IsOptional()
  healthWellnessData?: {
    servicesOffered?: string[]; // e.g., ["Emergency Care", "Prescriptions", "Deep Tissue Massage"]
    appointmentBookingUrl?: string;
    insuranceAccepted?:
      | boolean
      | string[]
      | {
          accepted: boolean;
          providers?: string[];
        };
    practitioners?: {
      name: string;
      specialty?: string;
      qualifications?: string;
      yearsOfExperience?: number;
    }[];
    membershipOptions?: {
      monthly?: number;
      yearly?: number;
      weekly?: number;
      dayPass?: number;
      trialPeriod?: number;
      features?: string[];
    };
    bookingUrl?: string;
  };

  // Nature & Outdoors-specific data (optional, only for nature & outdoors category)
  @IsOptional()
  natureOutdoorsData?: {
    entryFee?: string; // e.g., "Free", "$10 per person"
    keyActivities?: string[]; // e.g., ["Hiking", "Swimming", "Picnicking"]
    rules?: string[]; // e.g., ["Pets on leash", "No open fires"]
    bestTimeToVisit?: string; // e.g., "Spring for blooms", "Sunrise"
    keyExhibits?: string[]; // e.g., ["Panda Enclosure", "Rose Garden"]
  };

  // Entertainment-specific data (optional, only for entertainment category)
  @IsOptional()
  entertainmentData?: {
    eventSchedule?: string; // A URL or structured data for current and upcoming shows/events
    ticketPrice?: Record<string, any>; // e.g., {"adult": 20, "child": 10}
    ticketBookingUrl?: string;
    currentExhibits?: string[]; // For museums, a list of current special exhibits
    ageRestriction?: string;
  };
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

  // Restaurant-specific data (optional, only for restaurant category)
  @IsOptional()
  restaurantData?: {
    menuImageIds?: number[];
    dishImageIds?: number[];
    cuisineTypes?: string[];
    dietaryOptions?: string[];
  };

  // Accommodation-specific data (optional, only for accommodation category)
  @IsOptional()
  accommodationData?: {
    roomTypes?: {
      name: string;
      description?: string;
      capacity: number;
      photos?: number[]; // File IDs
    }[];
    bookingUrl?: string;
    checkInTime?: string; // '14:00'
    checkOutTime?: string; // '11:00'
  };

  // Shopping-specific data (optional, only for shopping category)
  @IsOptional()
  shoppingData?: {
    productCategories?: string[]; // e.g., ["Men's Clothing", "Groceries", "Electronics"]
    brandsCarried?: string[]; // e.g., ["Nike", "Adidas", "Apple"]
    onlineStoreUrl?: string;
    returnPolicy?: string;
    bookingUrl?: string; // For vehicle rentals or reservations
  };

  // Transport-specific data (optional, only for transport category)
  @IsOptional()
  transportData?: {
    operator?: string; // e.g., "Amtrak", "Greyhound"
    transportLines?: string[]; // e.g., ["Red Line", "Route 5B"]
    destinations?: string[]; // Array of major destinations served
    vehicleTypes?: string[]; // For Rentals: e.g., ["Sedan", "Mountain Bike", "Van"]
    rentalOptions?: {
      perHour?: number;
      perDay?: number;
      perWeek?: number;
      perMonth?: number;
    };
    bookingUrl?: string; // For vehicle rentals or reservations
  };

  // Health & Wellness-specific data (optional, only for health & wellness category)
  @IsOptional()
  healthWellnessData?: {
    servicesOffered?: string[]; // e.g., ["Emergency Care", "Prescriptions", "Deep Tissue Massage"]
    appointmentBookingUrl?: string;
    insuranceAccepted?:
      | boolean
      | string[]
      | {
          accepted: boolean;
          providers?: string[];
        };
    practitioners?: {
      name: string;
      specialty?: string;
      qualifications?: string;
      yearsOfExperience?: number;
    }[];
    membershipOptions?: {
      monthly?: number;
      yearly?: number;
      weekly?: number;
      dayPass?: number;
      trialPeriod?: number;
      features?: string[];
    };
    bookingUrl?: string;
  };

  // Nature & Outdoors-specific data (optional, only for nature & outdoors category)
  @IsOptional()
  natureOutdoorsData?: {
    entryFee?: string; // e.g., "Free", "$10 per person"
    keyActivities?: string[]; // e.g., ["Hiking", "Swimming", "Picnicking"]
    rules?: string[]; // e.g., ["Pets on leash", "No open fires"]
    bestTimeToVisit?: string; // e.g., "Spring for blooms", "Sunrise"
    keyExhibits?: string[]; // e.g., ["Panda Enclosure", "Rose Garden"]
  };

  // Entertainment-specific data (optional, only for entertainment category)
  @IsOptional()
  entertainmentData?: {
    eventSchedule?: string; // A URL or structured data for current and upcoming shows/events
    ticketPrice?: Record<string, any>; // e.g., {"adult": 20, "child": 10}
    ticketBookingUrl?: string;
    currentExhibits?: string[]; // For museums, a list of current special exhibits
    ageRestriction?: string;
  };
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
