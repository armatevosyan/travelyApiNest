import { HomeService } from './home.service';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getInit(country?: string): Promise<{
        success: boolean;
        data: {
            sliders: string[];
            categories: {
                termId: number;
                name: string;
                count: number;
                image: undefined;
                icon: string | null;
                color: string | null;
                taxonomy: string;
                hasChild: boolean;
                children: {
                    termId: number;
                    name: string;
                    count: number;
                    image: undefined;
                    icon: string | null;
                    color: string | null;
                    taxonomy: string;
                    hasChild: boolean;
                    id: number;
                }[];
                id: number;
            }[];
            locations: {
                termId: number;
                name: string;
                count: number;
                image: {
                    id: number;
                    full: {
                        url: string;
                    };
                    thumb: {
                        url: string;
                    };
                } | undefined;
                icon: null;
                color: null;
                taxonomy: string;
                hasChild: boolean;
                id: number;
            }[];
            recent_posts: {
                useViewPhone: string | null;
                id: number;
                postTitle: string;
                postDate: Date;
                ratingAvg: number;
                ratingCount: number;
                wishlist: boolean;
                image: {
                    id: number;
                    full: {
                        url: string;
                    };
                    thumb: {
                        url: string;
                    };
                } | undefined;
                author: {
                    id: number;
                    name: string;
                    userPhoto: string | null;
                } | undefined;
                category: {
                    termId: number;
                    name: string;
                    taxonomy: string;
                } | undefined;
                priceMin: number | null;
                priceMax: number | null;
                address: string | null;
                bookingUse: boolean;
                bookingPriceDisplay: string;
                name: string;
                description: string | null;
                countryId: number | null;
                country: import("../locations/location.entity").Location | null;
                stateId: number | null;
                state: import("../locations/location.entity").Location | null;
                cityId: number | null;
                city: import("../locations/location.entity").Location | null;
                postalCode: string | null;
                latitude: number | null;
                longitude: number | null;
                phone: string | null;
                email: string | null;
                website: string | null;
                categoryId: number;
                subcategoryId: number | null;
                subcategory: import("../categories/category.entity").Category | null;
                userId: number;
                user: import("../users/user.entity").User;
                imageIds: number[] | null;
                averageRating: number;
                reviewCount: number;
                isActive: boolean;
                isVerified: boolean;
                isFeatured: boolean;
                openingHours: Record<string, any> | null;
                social: {
                    facebook?: string | null;
                    instagram?: string | null;
                    twitter?: string | null;
                    linkedin?: string | null;
                } | null;
                slug: string | null;
                tags: import("../tags/tag.entity").Tag[];
                facilities: import("../facilities/facility.entity").Facility[];
                restaurant?: import("../restaurants").Restaurant | null;
                accommodation?: import("../accommodations").Accommodation | null;
                shopping?: import("../shopping").Shopping | null;
                transport?: import("../transport").Transport | null;
                healthWellness?: import("../health-wellness").HealthWellness | null;
                natureOutdoors?: import("../nature-outdoors").NatureOutdoors | null;
                entertainment?: import("../entertainment").Entertainment | null;
                priceType: string | null;
                price: number | null;
                minPrice: number | null;
                maxPrice: number | null;
                oldPrice: number | null;
                isPriceOnRequest: boolean;
                viewCount: number;
                favoriteCount: number;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
            }[];
            widgets: any[];
            news: {
                id: number;
                postTitle: string;
                postDate: Date;
                postStatus: string;
                postContent: string;
                commentCount: number;
                guid: null;
                image: {
                    id: number;
                    full: {
                        url: string;
                    };
                    thumb: {
                        url: string;
                    };
                } | undefined;
                author: {
                    id: number;
                    name: string;
                    firstName: string;
                    lastName: string;
                    userPhoto: string | null;
                    description: string | null;
                } | undefined;
                categories: {
                    termId: number;
                    name: string;
                    taxonomy: string;
                }[];
                comments: never[];
                related: {
                    id: number;
                    postTitle: string;
                    postDate: Date;
                    postContent: string;
                    commentCount: number;
                    image: {
                        id: number;
                        full: {
                            url: string;
                        };
                        thumb: {
                            url: string;
                        };
                    } | undefined;
                    author: {
                        id: number;
                        name: string;
                        userPhoto: null;
                    } | undefined;
                }[];
            }[];
        };
    }>;
}
