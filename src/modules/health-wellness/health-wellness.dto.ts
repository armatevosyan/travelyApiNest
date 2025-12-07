import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  IsUrl,
  IsObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PractitionerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  qualifications?: string;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;
}

class MembershipOptionsDto {
  @IsOptional()
  @IsNumber()
  monthly?: number;

  @IsOptional()
  @IsNumber()
  yearly?: number;

  @IsOptional()
  @IsNumber()
  weekly?: number;

  @IsOptional()
  @IsNumber()
  dayPass?: number;

  @IsOptional()
  @IsNumber()
  trialPeriod?: number; // days

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];
}

export class CreateHealthWellnessDto {
  @IsInt()
  placeId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  servicesOffered?: string[]; // e.g., ["Emergency Care", "Prescriptions", "Deep Tissue Massage"]

  @IsOptional()
  @IsUrl()
  appointmentBookingUrl?: string;

  @IsOptional()
  insuranceAccepted?:
    | boolean
    | string[]
    | {
        accepted: boolean;
        providers?: string[];
      };

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PractitionerDto)
  practitioners?: {
    name: string;
    specialty?: string;
    qualifications?: string;
    yearsOfExperience?: number;
  }[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MembershipOptionsDto)
  membershipOptions?: {
    monthly?: number;
    yearly?: number;
    weekly?: number;
    dayPass?: number;
    trialPeriod?: number;
    features?: string[];
  };

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}

export class UpdateHealthWellnessDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  servicesOffered?: string[];

  @IsOptional()
  @IsUrl()
  appointmentBookingUrl?: string;

  @IsOptional()
  insuranceAccepted?:
    | boolean
    | string[]
    | {
        accepted: boolean;
        providers?: string[];
      };

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PractitionerDto)
  practitioners?: {
    name: string;
    specialty?: string;
    qualifications?: string;
    yearsOfExperience?: number;
  }[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MembershipOptionsDto)
  membershipOptions?: {
    monthly?: number;
    yearly?: number;
    weekly?: number;
    dayPass?: number;
    trialPeriod?: number;
    features?: string[];
  };

  @IsOptional()
  @IsUrl()
  bookingUrl?: string;
}
