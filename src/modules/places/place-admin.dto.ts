import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { PlaceQueryDto } from './place.dto';

/** Admin list places: filter by status (pending | approved | rejected), search, category, etc. */
export class AdminPlaceQueryDto extends PlaceQueryDto {
  @IsOptional()
  @IsIn(['pending', 'approved', 'rejected'], {
    message: 't.PLACE_STATUS_INVALID',
  })
  status?: 'pending' | 'approved' | 'rejected';
}

export class RejectPlaceDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
