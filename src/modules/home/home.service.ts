import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Location, LocationType } from '../locations/location.entity';
import { Place } from '../places/place.entity';
import { Blog } from '../blog/blog.entity';
import { Wishlist } from '../wishlist/wishlist.entity';
import { FilesService } from '../files/files.service';
import { FileRelationType } from '../files/entities/file-relation.entity';
import { FileEntity } from '../files/entities/file.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly filesService: FilesService,
  ) {}

  async getInit(country?: string, userId?: number | null) {
    let location: Location | null = null;
    if (country) {
      location = await this.locationRepository.findOne({
        where: {
          name: country,
          type: LocationType.COUNTRY,
        },
      });
    }

    const sliders: string[] = [];

    const categories = await this.categoryRepository.find({
      where: {
        parentId: IsNull(),
        isActive: true,
      },
      relations: ['children'],
      order: {
        sortOrder: 'ASC',
        name: 'ASC',
      },
    });

    const locations = await this.locationRepository.find({
      where: {
        type: LocationType.COUNTRY,
      },
      relations: ['image'],
      order: {
        name: 'ASC',
      },
    });

    const locationIds = locations.map((l) => l.id);
    const placesCountByCountryId = new Map<number, number>();
    if (locationIds.length > 0) {
      const rows = await this.placeRepository
        .createQueryBuilder('place')
        .select('place.countryId', 'countryId')
        .addSelect('COUNT(place.id)', 'count')
        .where('place.countryId IN (:...countryIds)', {
          countryIds: locationIds,
        })
        .andWhere('place.isActive = :isActive', { isActive: true })
        .groupBy('place.countryId')
        .getRawMany<{ countryId: string; count: string }>();

      for (const row of rows) {
        const countryId = Number(row.countryId);
        const count = Number(row.count);
        if (!Number.isNaN(countryId) && !Number.isNaN(count)) {
          placesCountByCountryId.set(countryId, count);
        }
      }
    }

    const recentPostsQuery = this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect('place.category', 'category')
      .leftJoinAndSelect('place.user', 'user')
      .leftJoinAndSelect('place.country', 'country')
      .where('place.isActive = :isActive', { isActive: true })
      .orderBy('place.createdAt', 'DESC')
      .take(10);
    if (location) {
      recentPostsQuery.andWhere('place.countryId = :countryId', {
        countryId: location.id,
      });
    }

    const recentPosts = await recentPostsQuery.getMany();

    const wishlistedPlaceIds = new Set<number>();
    if (userId && recentPosts.length > 0) {
      const ids = recentPosts.map((p) => p.id);
      const rows = await this.wishlistRepository.find({
        select: ['placeId'],
        where: {
          userId,
          placeId: In(ids),
        },
      });
      for (const row of rows) wishlistedPlaceIds.add(row.placeId);
    }

    const relatedBlogs = await this.blogRepository.find({
      relations: ['user', 'category'],
      order: {
        createdAt: 'DESC',
      },
      take: 5,
    });

    const blogAuthorPhotoByUserId = new Map<number, string | null>();
    const blogAuthorIdsNeedingPhoto = Array.from(
      new Set(
        relatedBlogs
          .map((b) => b.user)
          .filter((u): u is NonNullable<typeof u> => Boolean(u))
          .filter((u) => Boolean(u.profileImageId))
          .map((u) => u.id),
      ),
    );
    await Promise.all(
      blogAuthorIdsNeedingPhoto.map(async (blogAuthorId) => {
        const userFileRelations =
          await this.filesService.getFileRelationsForEntity(
            FileRelationType.USER,
            blogAuthorId,
          );
        const userImage: FileEntity | null =
          userFileRelations.length > 0 ? userFileRelations[0].file : null;
        blogAuthorPhotoByUserId.set(
          blogAuthorId,
          userImage
            ? this.filesService.generatePublicUrl(userImage.bucketPath)
            : null,
        );
      }),
    );

    const formattedSliders = sliders;

    const formattedCategories = categories.map((category) => {
      const formattedChildren = (category.children || []).map((sub) => ({
        termId: sub.id,
        name: sub.name,
        count: 0,
        image: undefined,
        icon: sub.icon,
        color: sub.color,
        taxonomy: 'category',
        hasChild: false,
        id: sub.id,
      }));

      return {
        termId: category.id,
        name: category.name,
        count: 0,
        image: undefined,
        icon: category.icon,
        color: category.color,
        taxonomy: 'category',
        hasChild: category.children && category.children.length > 0,
        children: formattedChildren,
        id: category.id,
      };
    });

    // Format locations
    const formattedLocations = locations.map((loc) => ({
      termId: loc.id,
      name: loc.name,
      count: placesCountByCountryId.get(loc.id) ?? 0,
      image: loc.image
        ? {
            id: loc.image.id,
            full: {
              url: loc.image.url,
            },
            thumb: {
              url: loc.image.url,
            },
          }
        : undefined,
      icon: null,
      color: null,
      taxonomy: 'location',
      hasChild: false,
      id: loc.id,
    }));

    const formattedRecentPosts = await Promise.all(
      recentPosts.map(async (place) => {
        // Get place images
        const placeFileRelations =
          await this.filesService.getFileRelationsForEntity(
            FileRelationType.PLACE,
            place.id,
          );
        const placeImage: FileEntity | null =
          placeFileRelations.length > 0 ? placeFileRelations[0].file : null;

        let userImage: FileEntity | null = null;
        if (place.user?.profileImageId) {
          const userFileRelations =
            await this.filesService.getFileRelationsForEntity(
              FileRelationType.USER,
              place.user.id,
            );
          userImage =
            userFileRelations.length > 0 ? userFileRelations[0].file : null;
        }

        return {
          ...place,
          useViewPhone: place.phone,
          id: place.id,
          postTitle: place.name,
          postDate: place.createdAt,
          ratingAvg: place.averageRating,
          ratingCount: place.reviewCount,
          wishlist: wishlistedPlaceIds.has(place.id),
          image: placeImage
            ? {
                id: placeImage.id,
                full: {
                  url: this.filesService.generatePublicUrl(
                    placeImage.bucketPath,
                  ),
                },
                thumb: {
                  url: this.filesService.generatePublicUrl(
                    placeImage.bucketPath,
                  ),
                },
              }
            : undefined,
          author: place.user
            ? {
                id: place.user.id,
                name: place.user.fullName,
                userPhoto: userImage
                  ? this.filesService.generatePublicUrl(userImage.bucketPath)
                  : null,
              }
            : undefined,
          category: place.category
            ? {
                termId: place.category.id,
                name: place.category.name,
                taxonomy: 'category',
              }
            : undefined,
          priceMin: place.minPrice,
          priceMax: place.maxPrice,
          address: place.address,
          bookingUse: false,
          bookingPriceDisplay: place.price
            ? `${Number(place.price).toFixed(2)}$`
            : '0.00$',
        };
      }),
    );
    const formattedNews = await Promise.all(
      relatedBlogs.map(async (blog) => {
        let blogImage: string | null = null;
        if (blog.image) {
          blogImage = blog.image;
        }
        return {
          id: blog.id,
          postTitle: blog.title,
          postDate: blog.createdAt,
          postStatus: blog.publishedAt ? 'publish' : 'draft',
          postContent: blog.description,
          commentCount: 0,
          guid: null,
          image: blogImage
            ? {
                id: 0,
                full: { url: blogImage },
                thumb: { url: blogImage },
              }
            : undefined,
          author: blog.user
            ? {
                id: blog.user.id,
                name: blog.user.fullName,
                firstName: blog.user.fullName?.split(' ')[0] || '',
                lastName:
                  blog.user.fullName?.split(' ').slice(1).join(' ') || '',
                userPhoto: blog.user.profileImage,
                description: blog.user.description || null,
              }
            : undefined,
          categories: blog.category
            ? [
                {
                  termId: blog.category.id,
                  name: blog.category.name,
                  taxonomy: 'category',
                },
              ]
            : [],
          comments: [],
          related: relatedBlogs
            .filter((b) => b.id !== blog.id)
            .slice(0, 3)
            .map((related) => ({
              id: related.id,
              postTitle: related.title,
              postDate: related.createdAt,
              postContent: related.description?.substring(0, 150) + '...' || '',
              commentCount: 0,
              image: related.image
                ? {
                    id: 0,
                    full: { url: related.image },
                    thumb: { url: related.image },
                  }
                : undefined,
              author: related.user
                ? {
                    id: related.user.id,
                    name: related.user.fullName,
                    userPhoto:
                      blogAuthorPhotoByUserId.get(related.user.id) ?? null,
                  }
                : undefined,
            })),
        };
      }),
    );

    const formattedWidgets: any[] = [];
    return {
      sliders: formattedSliders,
      categories: formattedCategories,
      locations: formattedLocations,
      recent_posts: formattedRecentPosts,
      wishlist_places: formattedRecentPosts.filter((p) => p.wishlist),
      widgets: formattedWidgets,
      news: formattedNews,
    };
  }
}
