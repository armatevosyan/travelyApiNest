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
    activitiesOffered?: string[]; // e.g., ["Hiking", "Camping", "Fishing", "Rock Climbing"]
    equipmentRental?: {
      available: boolean;
      items?: {
        name: string;
        price?: number;
        priceUnit?: string; // "per_hour", "per_day", "per_week"
      }[];
    };
    guidedTours?: {
      available: boolean;
      tours?: {
        name: string;
        duration?: string; // e.g., "2 hours", "Half day", "Full day"
        price?: number;
        description?: string;
      }[];
    };
    trailInformation?: {
      difficulty?: string[]; // e.g., ["Easy", "Moderate", "Difficult"]
      totalLength?: number; // in kilometers or miles
      elevationGain?: number;
      estimatedTime?: string;
    };
    permitsRequired?: {
      required: boolean;
      types?: string[]; // e.g., ["Camping Permit", "Fishing License", "Park Entry"]
      whereToObtain?: string;
      cost?: number;
    };
    bestSeason?: string[]; // e.g., ["Spring", "Summer", "Fall"]
    campingOptions?: {
      available: boolean;
      sites?: number;
      facilities?: string[]; // e.g., ["Restrooms", "Fire Pits", "Picnic Tables"]
      reservationRequired?: boolean;
    };
    bookingUrl?: string;
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
