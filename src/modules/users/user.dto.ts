import {
  IsOptional,
  IsString,
  MaxLength,
  IsUrl,
  IsBoolean,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString({ message: 't.USER_FULL_NAME_INVALID' })
  @MaxLength(255, { message: 't.USER_FULL_NAME_MAX_LENGTH' })
  fullName?: string;

  @IsOptional()
  @IsUrl({}, { message: 't.USER_WEBSITE_INVALID' })
  @MaxLength(500, { message: 't.USER_WEBSITE_MAX_LENGTH' })
  website?: string;

  @IsOptional()
  @IsString({ message: 't.USER_DESCRIPTION_INVALID' })
  description?: string | null;
}

export class UpdateNotificationSettingDto {
  @IsBoolean({ message: 't.NOTIFICATIONS_ENABLED_INVALID' })
  notificationsEnabled: boolean;
}
