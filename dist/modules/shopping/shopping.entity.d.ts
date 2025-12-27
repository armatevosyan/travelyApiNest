import { Place } from '../places/place.entity';
export declare class Shopping {
    id: number;
    placeId: number;
    place: Place;
    productCategories: string[] | null;
    brandsCarried: string[] | null;
    onlineStoreUrl: string | null;
    returnPolicy: string | null;
    bookingUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
