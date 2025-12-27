import { LocationService } from './location.service';
import { LocationQueryDto } from './location.dto';
import { I18nService } from 'nestjs-i18n';
import { LocationType } from './location.entity';
export declare class LocationController {
    private readonly locationService;
    private readonly i18n;
    constructor(locationService: LocationService, i18n: I18nService);
    findAll(query: LocationQueryDto): Promise<{
        message: string;
        data: import("./location.entity").Location[];
        total: number;
    }>;
    getLocations(parentId?: string, type?: LocationType): Promise<{
        success: boolean;
        data: {
            term_id: number;
            name: string;
            type: LocationType;
            parent_id: number | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./location.entity").Location;
    }>;
}
