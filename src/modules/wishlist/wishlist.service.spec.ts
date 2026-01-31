import { WishlistService } from './wishlist.service';
import { FileRelationType } from '@/modules/files/entities/file-relation.entity';

describe('WishlistService', () => {
  describe('list', () => {
    it('should include place images in items', async () => {
      const wishlistRepo: any = {
        findAndCount: jest.fn().mockResolvedValue([
          [
            {
              place: {
                id: 10,
                name: 'Test place',
              },
            },
          ],
          1,
        ]),
      };

      const placeRepo: any = {
        findOne: jest.fn(),
      };

      const fileRelationRepo: any = {
        find: jest.fn().mockResolvedValue([
          {
            entityType: FileRelationType.PLACE,
            entityId: 10,
            file: {
              id: 99,
              bucketPath: 'places/10/image.jpg',
            },
          },
        ]),
      };

      const filesService: any = {
        generatePublicUrl: (bucketPath: string) => `https://cdn.example.com/${bucketPath}`,
      };

      const service = new WishlistService(
        wishlistRepo,
        placeRepo,
        fileRelationRepo,
        filesService,
      );

      const res = await service.list(1, 1, 10);

      expect(wishlistRepo.findAndCount).toHaveBeenCalled();
      expect(fileRelationRepo.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            entityType: FileRelationType.PLACE,
          }),
          relations: ['file'],
        }),
      );

      expect(res.items).toHaveLength(1);
      expect(res.items[0].images).toHaveLength(1);
      expect(res.items[0].image).toBeDefined();
      expect(res.items[0].image.thumb.url).toBe(
        'https://cdn.example.com/places/10/image.jpg',
      );
    });
  });
});
