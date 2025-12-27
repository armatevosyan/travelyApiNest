export declare class CreateEntertainmentDto {
    placeId: number;
    eventSchedule?: string;
    ticketPrice?: Record<string, any>;
    ticketBookingUrl?: string;
    currentExhibits?: string[];
    ageRestriction?: string;
}
export declare class UpdateEntertainmentDto {
    eventSchedule?: string;
    ticketPrice?: Record<string, any>;
    ticketBookingUrl?: string;
    currentExhibits?: string[];
    ageRestriction?: string;
}
