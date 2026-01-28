import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurant.dto';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
import { RestaurantSpecialDish } from './restaurant-special-dish.entity';
export declare class RestaurantService {
    private restaurantRepository;
    private restaurantSpecialDishRepository;
    private placeRepository;
    private fileRepository;
    constructor(restaurantRepository: Repository<Restaurant>, restaurantSpecialDishRepository: Repository<RestaurantSpecialDish>, placeRepository: Repository<Place>, fileRepository: Repository<FileEntity>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    updateByPlaceId(placeId: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    private replaceSpecialDishes;
    private updateFileRelations;
}
