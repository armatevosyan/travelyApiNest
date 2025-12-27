import { Repository } from 'typeorm';
import { Entertainment } from './entertainment.entity';
import { CreateEntertainmentDto, UpdateEntertainmentDto } from './entertainment.dto';
import { Place } from '../places/place.entity';
export declare class EntertainmentService {
    private entertainmentRepository;
    private placeRepository;
    constructor(entertainmentRepository: Repository<Entertainment>, placeRepository: Repository<Place>);
    create(createEntertainmentDto: CreateEntertainmentDto): Promise<Entertainment>;
    updateByPlaceId(placeId: number, updateEntertainmentDto: UpdateEntertainmentDto): Promise<Entertainment>;
}
