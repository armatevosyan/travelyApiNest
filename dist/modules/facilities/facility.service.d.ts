import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { Facility } from './facility.entity';
import { FacilityQueryDto } from './facility.dto';
export declare class FacilityService {
    private readonly facilityRepo;
    private readonly i18n;
    constructor(facilityRepo: Repository<Facility>, i18n: I18nService);
    findAll(query: FacilityQueryDto): Promise<{
        facilities: Facility[];
        total: number;
    }>;
    findByIds(ids: number[]): Promise<Facility[]>;
    incrementCount(facilityIds: number[]): Promise<void>;
    decrementCount(facilityIds: number[]): Promise<void>;
    updateCounts(oldFacilityIds: number[], newFacilityIds: number[]): Promise<void>;
}
