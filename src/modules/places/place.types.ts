import { User } from 'modules/users/user.entity';
import { Category } from 'modules/categories/category.entity';

export interface IPlace {
  id: number;

  // FROM CREATE DATA
  name: string;
  description?: string | null;
  address?: string | null; // "123 Main Street"
  city?: string | null; // "New York"
  state?: string | null; // "NY" or "New York"
  country?: string | null; // "United States"
  postalCode?: string | null; // "10001"
  latitude?: number | null; // 40.7128 (decimal, 10,8 precision)
  longitude?: number | null; // -74.0060 (decimal, 11,8 precision)
  phone?: string | null;
  email?: string | null;
  coverImage?: string | null;
  images?: string[];
  isActive: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  openingHours?: OpeningHours | null;
  website?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  slug?: string | null; // URL-friendly name (auto-generated if not provided)
  tags?: string | null; // Comma-separated tags: "italian, pizza, family-friendly"
  price?: number | null; // Main/base price
  minPrice?: number | null; // Minimum price (for price ranges)
  maxPrice?: number | null; // Maximum price (for price ranges)
  isPriceOnRequest?: boolean; // When price is negotiable/on request

  // AUTO-CALCULATED
  averageRating: number; // Default: 0
  reviewCount: number; // Default: 0
  viewCount: number; // Default: 0
  favoriteCount: number; // Default: 0

  // RELATIONS (loaded with relations)
  category: Category;
  user: User;

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
