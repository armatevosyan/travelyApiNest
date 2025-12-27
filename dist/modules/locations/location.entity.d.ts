import { FileEntity } from '@/modules/files/entities/file.entity';
export declare enum LocationType {
    COUNTRY = "country",
    STATE = "state",
    CITY = "city"
}
export declare class Location {
    id: number;
    name: string;
    type: LocationType;
    parentId: number | null;
    parent: Location | null;
    children: Location[];
    imageId: number | null;
    image: FileEntity | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
