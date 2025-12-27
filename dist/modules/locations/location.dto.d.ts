import { LocationType } from './location.entity';
export declare class LocationQueryDto {
    type?: LocationType;
    parentId?: number | null;
    search?: string;
}
