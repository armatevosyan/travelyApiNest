import { Place } from '@/modules/places/place.entity';
export declare class Facility {
    id: number;
    name: string;
    icon: string | null;
    description: string | null;
    count: number;
    places: Place[];
    createdAt: Date;
    updatedAt: Date;
}
