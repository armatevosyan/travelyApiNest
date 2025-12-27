import { I18nService } from 'nestjs-i18n';
import { FacilityService } from './facility.service';
import { FacilityQueryDto } from './facility.dto';
export declare class FacilityController {
    private readonly facilityService;
    private readonly i18n;
    constructor(facilityService: FacilityService, i18n: I18nService);
    findAll(query: FacilityQueryDto): Promise<{
        message: string;
        data: import("./facility.entity").Facility[];
        pagination: {
            total: number;
            limit: number;
            page: number;
            totalPages: number;
        };
    }>;
}
