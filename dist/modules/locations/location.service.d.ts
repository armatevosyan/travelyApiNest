import { Repository } from 'typeorm';
import { Location, LocationType } from './location.entity';
import { LocationQueryDto } from './location.dto';
import { I18nService } from 'nestjs-i18n';
export declare class LocationService {
    private readonly locationRepo;
    private readonly i18n;
    constructor(locationRepo: Repository<Location>, i18n: I18nService);
    private loadNestedChildren;
    findAll(query: LocationQueryDto): Promise<{
        data: Location[];
        total: number;
    }>;
    listLegacy(parentId?: number, type?: LocationType): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
    validateLocationHierarchy(countryId?: number | null, stateId?: number | null, cityId?: number | null): Promise<void>;
}
