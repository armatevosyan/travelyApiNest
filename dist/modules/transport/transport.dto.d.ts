export declare class CreateTransportDto {
    placeId: number;
    operator?: string;
    transportLines?: string[];
    destinations?: string[];
    vehicleTypes?: string[];
    rentalOptions?: {
        perHour?: number;
        perDay?: number;
        perWeek?: number;
        perMonth?: number;
    };
    bookingUrl?: string;
}
export declare class UpdateTransportDto {
    operator?: string;
    transportLines?: string[];
    destinations?: string[];
    vehicleTypes?: string[];
    rentalOptions?: {
        perHour?: number;
        perDay?: number;
        perWeek?: number;
        perMonth?: number;
    };
    bookingUrl?: string;
}
