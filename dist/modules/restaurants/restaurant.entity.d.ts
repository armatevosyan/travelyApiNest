import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
import { RestaurantSpecialDish } from './restaurant-special-dish.entity';
export declare class Restaurant {
    id: number;
    placeId: number;
    place: Place;
    menuImages: FileEntity[];
    dishImages: FileEntity[];
    specialDishes: RestaurantSpecialDish[];
    cuisineTypes: string[] | null;
    dietaryOptions: string[] | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
