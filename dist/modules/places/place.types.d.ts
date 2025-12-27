import { User } from 'modules/users/user.entity';
import { Category } from 'modules/categories/category.entity';
import { Facility } from '@/modules/facilities/facility.entity';
export interface IPlace {
    id: number;
    name: string;
    description?: string | null;
    address?: string | null;
    countryId?: number | null;
    stateId?: number | null;
    cityId?: number | null;
    postalCode?: string | null;
    latitude?: number | null;
    longitude?: number | null;
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
    slug?: string | null;
    tagIds?: number[];
    facilityIds?: number[];
    priceType?: string | null;
    price?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    oldPrice?: number | null;
    isPriceOnRequest?: boolean;
    averageRating: number;
    reviewCount: number;
    viewCount: number;
    favoriteCount: number;
    category: Category;
    subcategory?: Category | null;
    subcategoryId?: number | null;
    user: User;
    facilities?: Facility[];
    createdAt: Date;
    updatedAt: Date;
}
export interface CreatePlaceData extends Omit<IPlace, 'id' | 'category' | 'user' | 'createdAt' | 'updatedAt' | 'isActive' | 'isVerified' | 'isFeatured' | 'averageRating' | 'reviewCount' | 'viewCount' | 'favoriteCount'> {
    name: string;
    categoryId: number;
    facilityIds?: number[];
    restaurantData?: {
        menuImageIds?: number[];
        dishImageIds?: number[];
        cuisineTypes?: string[];
        dietaryOptions?: string[];
    };
    accommodationData?: {
        roomTypes?: {
            name: string;
            description?: string;
            capacity: number;
            photos?: number[];
        }[];
        bookingUrl?: string;
        checkInTime?: string;
        checkOutTime?: string;
    };
    shoppingData?: {
        productCategories?: string[];
        brandsCarried?: string[];
        onlineStoreUrl?: string;
        returnPolicy?: string;
        bookingUrl?: string;
    };
    transportData?: {
        operator?: string;
        transportLines?: string[];
        destinations?: string[];
        vehicleTypes?: string[];
        rentalOptions?: {
            perHour?: number;
            perDay?: number;
            perWeek?: number;
            perMonth?: number;
        };
        bookingUrl?: string;
    };
    healthWellnessData?: {
        servicesOffered?: string[];
        appointmentBookingUrl?: string;
        insuranceAccepted?: boolean | string[] | {
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
    natureOutdoorsData?: {
        entryFee?: string;
        keyActivities?: string[];
        rules?: string[];
        bestTimeToVisit?: string;
        keyExhibits?: string[];
    };
    entertainmentData?: {
        eventSchedule?: string;
        ticketPrice?: Record<string, any>;
        ticketBookingUrl?: string;
        currentExhibits?: string[];
        ageRestriction?: string;
    };
}
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
    open: string | null;
    close: string | null;
    isClosed?: boolean;
}
