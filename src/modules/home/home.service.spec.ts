import { HomeService } from './home.service';

describe('HomeService.getInit (wishlist)', () => {
  const makeQueryBuilder = (places: any[]) => {
    const qb: any = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(places),

      // Allow reusing the same helper for the count aggregation query builder
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([]),
    };
    return qb;
  };

  const makeCountQueryBuilder = (rows: Array<{ countryId: string; count: string }>) => {
    const qb: any = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(rows),
    };
    return qb;
  };

  const makeFilesService = () => ({
    getFileRelationsForEntity: jest.fn().mockResolvedValue([]),
    generatePublicUrl: jest.fn((p: string) => `https://cdn.test/${p}`),
  });

  it('sets wishlist=true for recent_posts that are in the user wishlist', async () => {
    const recentPlaces = [
      {
        id: 10,
        name: 'Place A',
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        averageRating: 4.2,
        reviewCount: 5,
        phone: null,
        minPrice: null,
        maxPrice: null,
        address: null,
        price: null,
        user: null,
        category: null,
      },
      {
        id: 11,
        name: 'Place B',
        createdAt: new Date('2026-01-02T00:00:00.000Z'),
        averageRating: 4.8,
        reviewCount: 9,
        phone: null,
        minPrice: null,
        maxPrice: null,
        address: null,
        price: null,
        user: null,
        category: null,
      },
    ];

    const placeRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(makeQueryBuilder(recentPlaces)),
    } as any;

    const wishlistRepository = {
      find: jest.fn().mockResolvedValue([{ placeId: 11 }]),
    } as any;

    const homeService = new HomeService(
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      {
        findOne: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockResolvedValue([]),
      } as any,
      placeRepository,
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      wishlistRepository,
      makeFilesService() as any,
    );

    const res: any = await homeService.getInit(undefined, 123);

    expect(res.recent_posts).toHaveLength(2);
    expect(res.recent_posts.find((p: any) => p.id === 10).wishlist).toBe(false);
    expect(res.recent_posts.find((p: any) => p.id === 11).wishlist).toBe(true);
    expect(res.wishlist_places.map((p: any) => p.id)).toEqual([11]);
    expect(wishlistRepository.find).toHaveBeenCalledTimes(1);
  });

  it('does not query wishlist when userId is not provided', async () => {
    const recentPlaces = [
      {
        id: 10,
        name: 'Place A',
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        averageRating: null,
        reviewCount: 0,
        phone: null,
        minPrice: null,
        maxPrice: null,
        address: null,
        price: null,
        user: null,
        category: null,
      },
    ];

    const placeRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(makeQueryBuilder(recentPlaces)),
    } as any;

    const wishlistRepository = {
      find: jest.fn(),
    } as any;

    const homeService = new HomeService(
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      {
        findOne: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockResolvedValue([]),
      } as any,
      placeRepository,
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      wishlistRepository,
      makeFilesService() as any,
    );

    const res: any = await homeService.getInit(undefined, null);
    expect(res.recent_posts[0].wishlist).toBe(false);
    expect(wishlistRepository.find).not.toHaveBeenCalled();
  });

  it('sets locations[].count based on number of active places per country', async () => {
    const locations = [
      { id: 1, name: 'Country A', image: null },
      { id: 2, name: 'Country B', image: null },
    ];

    const countQb = makeCountQueryBuilder([
      { countryId: '1', count: '3' },
      { countryId: '2', count: '0' },
    ]);
    const recentQb = makeQueryBuilder([]);

    const placeRepository = {
      createQueryBuilder: jest
        .fn()
        .mockReturnValueOnce(countQb)
        .mockReturnValueOnce(recentQb),
    } as any;

    const homeService = new HomeService(
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      {
        findOne: jest.fn().mockResolvedValue(null),
        find: jest.fn().mockResolvedValue(locations),
      } as any,
      placeRepository,
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      {
        find: jest.fn().mockResolvedValue([]),
      } as any,
      makeFilesService() as any,
    );

    const res: any = await homeService.getInit(undefined, null);

    expect(res.locations).toHaveLength(2);
    expect(res.locations.find((l: any) => l.id === 1).count).toBe(3);
    expect(res.locations.find((l: any) => l.id === 2).count).toBe(0);
  });
});
