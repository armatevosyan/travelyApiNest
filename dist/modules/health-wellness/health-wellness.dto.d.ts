export declare class CreateHealthWellnessDto {
    placeId: number;
    servicesOffered?: string[];
    appointmentBookingUrl?: string;
    insuranceAccepted?: boolean | string[] | {
        accepted: boolean;
        providers?: string[];
    };
    practitioners?: {
        name: string;
        specialty?: string;
        qualifications?: string;
        yearsOfExperience?: number;
    }[];
    membershipOptions?: {
        monthly?: number;
        yearly?: number;
        weekly?: number;
        dayPass?: number;
        trialPeriod?: number;
        features?: string[];
    };
    bookingUrl?: string;
}
export declare class UpdateHealthWellnessDto {
    servicesOffered?: string[];
    appointmentBookingUrl?: string;
    insuranceAccepted?: boolean | string[] | {
        accepted: boolean;
        providers?: string[];
    };
    practitioners?: {
        name: string;
        specialty?: string;
        qualifications?: string;
        yearsOfExperience?: number;
    }[];
    membershipOptions?: {
        monthly?: number;
        yearly?: number;
        weekly?: number;
        dayPass?: number;
        trialPeriod?: number;
        features?: string[];
    };
    bookingUrl?: string;
}
