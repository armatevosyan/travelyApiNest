import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class WishlistListQueryDto {
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : value))
  @IsInt()
  @Min(1)
  page?: number;

  // Mobile app uses `perPage`
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : value))
  @IsInt()
  @Min(1)
  perPage?: number;
}

export class WishlistPostDto {
  // Mobile app sends `post_id` (legacy naming). In Nest we map it to `placeId`.
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  post_id: number;
}
