import { Place } from '../places/place.entity';
export declare class Entertainment {
    id: number;
    placeId: number;
    place: Place;
    eventSchedule: string | null;
    ticketPrice: Record<string, any> | null;
    ticketBookingUrl: string | null;
    currentExhibits: string[] | null;
    ageRestriction: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
