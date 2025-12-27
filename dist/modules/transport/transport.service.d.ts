import { Repository } from 'typeorm';
import { Transport } from './transport.entity';
import { CreateTransportDto, UpdateTransportDto } from './transport.dto';
import { Place } from '../places/place.entity';
export declare class TransportService {
    private transportRepository;
    private placeRepository;
    constructor(transportRepository: Repository<Transport>, placeRepository: Repository<Place>);
    create(createTransportDto: CreateTransportDto): Promise<Transport>;
    findOne(id: number): Promise<Transport>;
    updateByPlaceId(placeId: number, updateTransportDto: UpdateTransportDto): Promise<Transport>;
}
