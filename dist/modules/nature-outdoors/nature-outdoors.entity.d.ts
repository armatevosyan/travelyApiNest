import { Place } from '../places/place.entity';
export declare class NatureOutdoors {
    id: number;
    placeId: number;
    place: Place;
    entryFee: string | null;
    keyActivities: string[] | null;
    rules: string[] | null;
    bestTimeToVisit: string | null;
    keyExhibits: string[] | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
