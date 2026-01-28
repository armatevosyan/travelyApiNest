import * as placeTypes from '@/modules/places/place.types';
declare class RestaurantSpecialDishInputDto {
    imageId: number;
    title?: string | null;
    description?: string | null;
}
declare class RestaurantDataDto {
    menuImageIds?: number[];
    dishImageIds?: number[];
    specialDishes?: RestaurantSpecialDishInputDto[];
    cuisineTypes?: string[];
    dietaryOptions?: string[];
}
export declare class CreatePlaceDto {
    name: string;
    description?: string | null;
    address?: string;
    countryId?: number | null;
    stateId?: number | null;
    cityId?: number | null;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    website?: string;
    categoryId: number;
    subcategoryId?: number;
    imageIds?: number[] | null;
    openingHours?: placeTypes.OpeningHours;
    social?: {
        facebook?: string | null;
        instagram?: string | null;
        twitter?: string | null;
        linkedin?: string | null;
    };
    slug?: string;
    tagIds?: number[];
    facilityIds?: number[];
    price?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    isPriceOnRequest?: boolean;
    priceType?: string | null;
    oldPrice?: number | null;
    restaurantData?: RestaurantDataDto;
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
export declare class UpdatePlaceDto {
    name?: string;
    description?: string;
    address?: string;
    countryId?: number | null;
    stateId?: number | null;
    cityId?: number | null;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    website?: string;
    categoryId?: number;
    subcategoryId?: number;
    imageIds?: number[] | null;
    openingHours?: placeTypes.OpeningHours;
    social?: {
        facebook?: string | null;
        instagram?: string | null;
        twitter?: string | null;
        linkedin?: string | null;
    };
    slug?: string;
    tagIds?: number[];
    facilityIds?: number[];
    price?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    priceType?: string | null;
    oldPrice?: number | null;
    isPriceOnRequest?: boolean;
    restaurantData?: RestaurantDataDto;
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
export declare class PlaceQueryDto {
    categoryId?: number;
    subcategoryId?: number;
    userId?: number;
    cityId?: number;
    countryId?: number;
    isActive?: boolean;
    isFeatured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    isPriceOnRequest?: boolean;
    page?: number;
    limit?: number;
}
export {};
