import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceReview } from './place-review.entity';
import { Place } from './place.entity';
import {
  CreatePlaceReviewDto,
  PlaceReviewQueryDto,
  UpdatePlaceReviewDto,
} from './place-review.dto';
import { I18nService } from 'nestjs-i18n';

export interface PlaceReviewWithUser {
  id: number;
  placeId: number;
  userId: number;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    fullName: string | null;
    profileImage: string | null;
  };
}

@Injectable()
export class PlaceReviewService {
  constructor(
    @InjectRepository(PlaceReview)
    private readonly placeReviewRepository: Repository<PlaceReview>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    private readonly i18n: I18nService,
  ) {}

  async create(
    placeId: number,
    userId: number,
    dto: CreatePlaceReviewDto,
  ): Promise<PlaceReviewWithUser> {
    const place = await this.placeRepository.findOne({
      where: { id: placeId },
    });
    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    if (place.userId === userId) {
      throw new ForbiddenException(
        this.i18n.translate('t.REVIEW_OWN_PLACE_NOT_ALLOWED'),
      );
    }

    const existing = await this.placeReviewRepository.findOne({
      where: { placeId, userId },
    });
    if (existing) {
      throw new ConflictException(
        this.i18n.translate('t.REVIEW_ALREADY_EXISTS'),
      );
    }

    const review = this.placeReviewRepository.create({
      placeId,
      userId,
      rating: dto.rating,
      comment: dto.comment ?? null,
    });
    const saved = await this.placeReviewRepository.save(review);
    await this.recalculatePlaceAggregates(placeId);
    const withUser = await this.placeReviewRepository.findOne({
      where: { id: saved.id },
      relations: ['user', 'user.profileImage'],
    });
    if (!withUser)
      throw new NotFoundException(this.i18n.translate('t.REVIEW_NOT_FOUND'));

    return this.mapToReviewWithUser(withUser);
  }

  async update(
    placeId: number,
    reviewId: number,
    userId: number,
    dto: UpdatePlaceReviewDto,
  ): Promise<PlaceReviewWithUser> {
    if (dto.rating === undefined && dto.comment === undefined) {
      throw new BadRequestException(
        this.i18n.translate('t.REVIEW_UPDATE_EMPTY'),
      );
    }
    const review = await this.placeReviewRepository.findOne({
      where: { id: reviewId, placeId },
      relations: ['place', 'user', 'user.profileImage'],
    });
    if (!review) {
      throw new NotFoundException(this.i18n.translate('t.REVIEW_NOT_FOUND'));
    }
    if (review.userId !== userId) {
      throw new ForbiddenException(this.i18n.translate('t.REVIEW_NOT_OWNER'));
    }

    if (dto.rating !== undefined) review.rating = dto.rating;
    if (dto.comment !== undefined) review.comment = dto.comment;
    const saved = await this.placeReviewRepository.save(review);
    await this.recalculatePlaceAggregates(placeId);

    return this.mapToReviewWithUser(saved);
  }

  async findByPlace(
    placeId: number,
    query: PlaceReviewQueryDto,
  ): Promise<{
    reviews: PlaceReviewWithUser[];
    total: number;
    limit: number;
  }> {
    const place = await this.placeRepository.findOne({
      where: { id: placeId },
    });
    if (!place) {
      throw new NotFoundException(this.i18n.translate('t.PLACE_NOT_FOUND'));
    }

    const page = query.page ?? 0;
    const limit = Math.min(query.limit ?? 20, 50);
    const skip = page * limit;

    const [reviews, total] = await this.placeReviewRepository.findAndCount({
      where: { placeId },
      relations: ['user', 'user.profileImage'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    const reviewsWithUser: PlaceReviewWithUser[] = reviews.map((r) =>
      this.mapToReviewWithUser(r),
    );

    return { reviews: reviewsWithUser, total, limit };
  }

  async remove(
    placeId: number,
    reviewId: number,
    userId: number,
  ): Promise<void> {
    const review = await this.placeReviewRepository.findOne({
      where: { id: reviewId, placeId },
    });
    if (!review) {
      throw new NotFoundException(this.i18n.translate('t.REVIEW_NOT_FOUND'));
    }
    if (review.userId !== userId) {
      throw new ForbiddenException(this.i18n.translate('t.REVIEW_NOT_OWNER'));
    }
    await this.placeReviewRepository.remove(review);
    await this.recalculatePlaceAggregates(placeId);
  }

  private async recalculatePlaceAggregates(placeId: number): Promise<void> {
    const result = await this.placeReviewRepository
      .createQueryBuilder('r')
      .select('AVG(r.rating)', 'avgRating')
      .addSelect('COUNT(r.id)', 'count')
      .where('r.placeId = :placeId', { placeId })
      .getRawOne<{ avgRating: string; count: string }>();

    const count = result?.count ? parseInt(result.count, 10) : 0;
    const avgRating = result?.avgRating
      ? parseFloat(parseFloat(result.avgRating).toFixed(2))
      : 0;

    await this.placeRepository.update(placeId, {
      averageRating: avgRating,
      reviewCount: count,
    });
  }

  private mapToReviewWithUser(r: PlaceReview): PlaceReviewWithUser {
    const user = (r as any).user;
    const isDeactivated = !!user?.deactivatedAt;
    return {
      id: r.id,
      placeId: r.placeId,
      userId: r.userId,
      rating: Number(r.rating),
      comment: r.comment,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      user: {
        id: user?.id ?? r.userId,
        fullName: isDeactivated
          ? this.i18n.translate('t.DEACTIVATED_USER')
          : (user?.fullName ?? null),
        profileImage: isDeactivated ? null : (user?.profileImage?.url ?? null),
      },
    };
  }
}
