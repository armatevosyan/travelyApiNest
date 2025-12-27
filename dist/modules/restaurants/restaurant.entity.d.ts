import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
export declare class Restaurant {
    id: number;
    placeId: number;
    place: Place;
    menuImages: FileEntity[];
    dishImages: FileEntity[];
    cuisineTypes: string[] | null;
    dietaryOptions: string[] | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
