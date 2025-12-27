import { Repository } from 'typeorm';
import { Shopping } from './shopping.entity';
import { CreateShoppingDto, UpdateShoppingDto } from './shopping.dto';
import { Place } from '../places/place.entity';
export declare class ShoppingService {
    private shoppingRepository;
    private placeRepository;
    constructor(shoppingRepository: Repository<Shopping>, placeRepository: Repository<Place>);
    create(createShoppingDto: CreateShoppingDto): Promise<Shopping>;
    findOne(id: number): Promise<Shopping>;
    findByPlaceId(placeId: number): Promise<Shopping>;
    update(id: number, updateShoppingDto: UpdateShoppingDto): Promise<Shopping>;
    updateByPlaceId(placeId: number, updateShoppingDto: UpdateShoppingDto): Promise<Shopping>;
}
