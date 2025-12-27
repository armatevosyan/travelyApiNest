import { Repository } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { CreateAccommodationDto, UpdateAccommodationDto } from './accommodation.dto';
import { Place } from '../places/place.entity';
import { FileEntity } from '../files/entities/file.entity';
export declare class AccommodationService {
    private accommodationRepository;
    private placeRepository;
    private fileRepository;
    constructor(accommodationRepository: Repository<Accommodation>, placeRepository: Repository<Place>, fileRepository: Repository<FileEntity>);
    create(createAccommodationDto: CreateAccommodationDto): Promise<Accommodation>;
    findOne(id: number): Promise<Accommodation>;
    update(id: number, updateAccommodationDto: UpdateAccommodationDto): Promise<Accommodation>;
    updateByPlaceId(placeId: number, updateAccommodationDto: UpdateAccommodationDto): Promise<Accommodation>;
    loadRoomPhotos(accommodation: Accommodation): Promise<Accommodation & {
        roomTypesWithPhotos?: any[];
    }>;
}
