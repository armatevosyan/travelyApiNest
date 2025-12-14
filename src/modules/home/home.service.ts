import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Location, LocationType } from '../locations/location.entity';
import { Place } from '../places/place.entity';
import { Blog } from '../blog/blog.entity';
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
    private readonly filesService: FilesService,
  ) {}

  async getInit(country?: string) {
    // Get location by country name if provided
    let location: Location | null = null;
    if (country) {
      location = await this.locationRepository.findOne({
        where: {
          name: country,
          type: LocationType.COUNTRY,
        },
      });
    }

    // Get sliders (empty for now - Banner entity not implemented)
    const sliders: string[] = [];

    // Get categories with subcategories
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
      take: 10,
    });

    // Get locations (countries)
    const locations = await this.locationRepository.find({
      where: {
        type: LocationType.COUNTRY,
      },
      order: {
        name: 'ASC',
      },
      take: 10,
    });

    // Get recent posts (places) filtered by country
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

    // Get related blogs
    const relatedBlogs = await this.blogRepository.find({
      relations: ['user', 'category'],
      order: {
        createdAt: 'DESC',
      },
      take: 5,
    });

    // Format sliders (empty for now)
    const formattedSliders = sliders;

    // Format categories
    const formattedCategories = categories.map((category) => {
      // Format subcategories
      const formattedChildren = (category.children || []).map((sub) => ({
        termId: sub.id,
        name: sub.name,
        count: 0,
        image: undefined,
        icon: sub.icon,
        color: sub.color,
        taxonomy: 'category',
        hasChild: false,
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
      };
    });

    // Format locations
    const formattedLocations = locations.map((loc) => ({
      termId: loc.id,
      name: loc.name,
      count: 0,
      image: undefined,
      icon: null,
      color: null,
      taxonomy: 'location',
      hasChild: false,
    }));

    // Format recent posts
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

        // Get user profile image
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
          wishlist: false,
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

    // Format news (blogs)
    const formattedNews = await Promise.all(
      relatedBlogs.map(async (blog) => {
        // Get blog image if stored as file relation
        let blogImage: string | null = null;
        if (blog.image) {
          // If image is a URL string, use it directly
          blogImage = blog.image;
        }

        // Get user profile image
        let userImage: FileEntity | null = null;
        if (blog.user?.profileImageId) {
          const userFileRelations =
            await this.filesService.getFileRelationsForEntity(
              FileRelationType.USER,
              blog.user.id,
            );
          userImage =
            userFileRelations.length > 0 ? userFileRelations[0].file : null;
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
                userPhoto: userImage
                  ? this.filesService.generatePublicUrl(userImage.bucketPath)
                  : null,
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
                    userPhoto: null,
                  }
                : undefined,
            })),
        };
      }),
    );

    // Widgets (empty for now - Widget entity not implemented)
    const formattedWidgets: any[] = [];

    return {
      sliders: formattedSliders,
      categories: formattedCategories,
      locations: formattedLocations,
      recentPosts: formattedRecentPosts,
      widgets: formattedWidgets,
      news: formattedNews,
    };
  }
}
