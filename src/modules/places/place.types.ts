import { User } from 'modules/users/user.entity';
import { Category } from 'modules/categories/category.entity';
import { Facility } from '@/modules/facilities/facility.entity';

export interface IPlace {
  id: number;

  // FROM CREATE DATA
  name: string;
  description?: string | null;
  address?: string | null; // "123 Main Street"
  countryId?: number | null; // Country ID
  stateId?: number | null; // State ID
  cityId?: number | null; // City ID
  postalCode?: string | null; // "10001"
  latitude?: number | null; // 40.7128 (decimal, 10,8 precision)
  longitude?: number | null; // -74.0060 (decimal, 11,8 precision)
  phone?: string | null;
  email?: string | null;
  imageIds?: number[] | null;
  isActive: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  openingHours?: OpeningHours | null;
  website?: string | null;
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  } | null;
  slug?: string | null; // URL-friendly name (auto-generated if not provided)
  tagIds?: number[]; // Array of tag IDs for many-to-many relationship
  facilityIds?: number[]; // Array of facility IDs
  priceType?: string | null; // 'range', 'fixed', 'onRequest', 'free', 'discounted'
  price?: number | null; // Main/base price (for fixed price)
  minPrice?: number | null; // Minimum price (for price ranges)
  maxPrice?: number | null; // Maximum price (for price ranges)
  oldPrice?: number | null; // Old price (for discounted items)
  isPriceOnRequest?: boolean; // When price is negotiable/on request

  // AUTO-CALCULATED
  averageRating: number; // Default: 0
  reviewCount: number; // Default: 0
  viewCount: number; // Default: 0
  favoriteCount: number; // Default: 0

  // RELATIONS (loaded with relations)
  category: Category;
  subcategory?: Category | null;
  subcategoryId?: number | null;
  user: User;
  facilities?: Facility[];

  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePlaceData
  extends Omit<
    IPlace,
    | 'id'
    | 'category'
    | 'user'
    | 'createdAt'
    | 'updatedAt'
    | 'isActive'
    | 'isVerified'
    | 'isFeatured'
    | 'averageRating'
    | 'reviewCount'
    | 'viewCount'
    | 'favoriteCount'
  > {
  // REQUIRED FIELDS
  name: string;
  categoryId: number;
  facilityIds?: number[];

  // RESTAURANT-SPECIFIC FIELDS (optional, only for restaurant category)
  restaurantData?: {
    menuImageIds?: number[];
    dishImageIds?: number[];
    specialDishes?: {
      imageId: number;
      title?: string | null;
      description?: string | null;
    }[];
    cuisineTypes?: string[];
    dietaryOptions?: string[];
  };

  // ACCOMMODATION-SPECIFIC FIELDS (optional, only for accommodation category)
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

  // SHOPPING-SPECIFIC FIELDS (optional, only for shopping category)
  shoppingData?: {
    productCategories?: string[]; // e.g., ["Men's Clothing", "Groceries", "Electronics"]
    brandsCarried?: string[]; // e.g., ["Nike", "Adidas", "Apple"]
    onlineStoreUrl?: string;
    returnPolicy?: string;
    bookingUrl?: string; // For vehicle rentals or reservations
  };

  // TRANSPORT-SPECIFIC FIELDS (optional, only for transport category)
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

  // HEALTH & WELLNESS-SPECIFIC FIELDS (optional, only for health & wellness category)
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

  // NATURE & OUTDOORS-SPECIFIC FIELDS (optional, only for nature & outdoors category)
  natureOutdoorsData?: {
    entryFee?: string; // e.g., "Free", "$10 per person"
    keyActivities?: string[]; // e.g., ["Hiking", "Swimming", "Picnicking"]
    rules?: string[]; // e.g., ["Pets on leash", "No open fires"]
    bestTimeToVisit?: string; // e.g., "Spring for blooms", "Sunrise"
    keyExhibits?: string[]; // e.g., ["Panda Enclosure", "Rose Garden"]
  };

  // ENTERTAINMENT-SPECIFIC FIELDS (optional, only for entertainment category)
  entertainmentData?: {
    eventSchedule?: string; // A URL or structured data for current and upcoming shows/events
    ticketPrice?: Record<string, any>; // e.g., {"adult": 20, "child": 10}
    ticketBookingUrl?: string;
    currentExhibits?: string[]; // For museums, a list of current special exhibits
    ageRestriction?: string;
  };
}

/**
 * Operating Hours Structure
 * Example:
 * {
 *   monday: { open: '09:00', close: '17:00', isClosed: false },
 *   tuesday: { open: '09:00', close: '17:00', isClosed: false },
 *   wednesday: { open: null, close: null, isClosed: true },
 *   ...
 * }
 */
export interface OpeningHours {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

export interface DaySchedule {
  open: string | null; // Format: "HH:MM" or null
  close: string | null; // Format: "HH:MM" or null
  isClosed?: boolean;
}
