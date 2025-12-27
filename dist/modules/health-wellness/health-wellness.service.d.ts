import { Repository } from 'typeorm';
import { HealthWellness } from './health-wellness.entity';
import { CreateHealthWellnessDto, UpdateHealthWellnessDto } from './health-wellness.dto';
import { Place } from '../places/place.entity';
export declare class HealthWellnessService {
    private healthWellnessRepository;
    private placeRepository;
    constructor(healthWellnessRepository: Repository<HealthWellness>, placeRepository: Repository<Place>);
    create(createHealthWellnessDto: CreateHealthWellnessDto): Promise<HealthWellness>;
    updateByPlaceId(placeId: number, updateHealthWellnessDto: UpdateHealthWellnessDto): Promise<HealthWellness>;
}
