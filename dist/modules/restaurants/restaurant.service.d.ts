import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurant.dto';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
export declare class RestaurantService {
    private restaurantRepository;
    private placeRepository;
    private fileRepository;
    constructor(restaurantRepository: Repository<Restaurant>, placeRepository: Repository<Place>, fileRepository: Repository<FileEntity>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    updateByPlaceId(placeId: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    private updateFileRelations;
}
