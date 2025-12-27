import { Place } from '../places/place.entity';
export declare class Accommodation {
    id: number;
    placeId: number;
    place: Place;
    roomTypes: {
        name: string;
        description?: string;
        capacity: number;
        photos?: number[];
    }[] | null;
    bookingUrl: string | null;
    checkInTime: string | null;
    checkOutTime: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
