import { Place } from '../places/place.entity';
export declare class Tag {
    id: number;
    name: string;
    slug: string | null;
    places: Place[];
    createdAt: Date;
    updatedAt: Date;
}
