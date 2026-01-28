export declare class RestaurantSpecialDishDto {
    imageId: number;
    title?: string | null;
    description?: string | null;
}
export declare class CreateRestaurantDto {
    placeId: number;
    menuImageIds?: number[];
    dishImageIds?: number[];
    specialDishes?: RestaurantSpecialDishDto[];
    cuisineTypes?: string[];
    dietaryOptions?: string[];
}
export declare class UpdateRestaurantDto {
    menuImageIds?: number[];
    dishImageIds?: number[];
    specialDishes?: RestaurantSpecialDishDto[];
    cuisineTypes?: string[];
    dietaryOptions?: string[];
}
