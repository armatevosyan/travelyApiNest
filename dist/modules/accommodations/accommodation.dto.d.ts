export declare class RoomTypeDto {
    name: string;
    description?: string;
    capacity: number;
    photos?: number[];
}
export declare class CreateAccommodationDto {
    placeId: number;
    roomTypes?: RoomTypeDto[];
    bookingUrl?: string;
    checkInTime?: string;
    checkOutTime?: string;
}
export declare class UpdateAccommodationDto {
    roomTypes?: RoomTypeDto[];
    bookingUrl?: string;
    checkInTime?: string;
    checkOutTime?: string;
}
