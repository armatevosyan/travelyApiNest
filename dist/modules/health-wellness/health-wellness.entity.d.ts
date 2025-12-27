import { Place } from '../places/place.entity';
export declare class HealthWellness {
    id: number;
    placeId: number;
    place: Place;
    servicesOffered: string[] | null;
    appointmentBookingUrl: string | null;
    insuranceAccepted: boolean | string[] | {
        accepted: boolean;
        providers?: string[];
    } | null;
    practitioners: {
        name: string;
        specialty?: string;
        qualifications?: string;
        yearsOfExperience?: number;
    }[] | null;
    membershipOptions: {
        monthly?: number;
        yearly?: number;
        weekly?: number;
        dayPass?: number;
        trialPeriod?: number;
        features?: string[];
    } | null;
    bookingUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
