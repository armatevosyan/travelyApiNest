import { Repository } from 'typeorm';
import { NatureOutdoors } from './nature-outdoors.entity';
import { CreateNatureOutdoorsDto, UpdateNatureOutdoorsDto } from './nature-outdoors.dto';
import { Place } from '../places/place.entity';
export declare class NatureOutdoorsService {
    private natureOutdoorsRepository;
    private placeRepository;
    constructor(natureOutdoorsRepository: Repository<NatureOutdoors>, placeRepository: Repository<Place>);
    create(createNatureOutdoorsDto: CreateNatureOutdoorsDto): Promise<NatureOutdoors>;
    updateByPlaceId(placeId: number, updateNatureOutdoorsDto: UpdateNatureOutdoorsDto): Promise<NatureOutdoors>;
}
