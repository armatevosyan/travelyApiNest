import { Place } from '../places/place.entity';
export declare class Transport {
    id: number;
    placeId: number;
    place: Place;
    operator: string | null;
    transportLines: string[] | null;
    destinations: string[] | null;
    vehicleTypes: string[] | null;
    rentalOptions: {
        perHour?: number;
        perDay?: number;
        perWeek?: number;
        perMonth?: number;
    } | null;
    bookingUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
