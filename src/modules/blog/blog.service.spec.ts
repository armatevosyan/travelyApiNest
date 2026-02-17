import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { UserService } from '@/modules/users/user.service';
import { CategoryService } from '@/modules/categories/category.service';
import { FilesService } from '@/modules/files/files.service';

describe('BlogService', () => {
  let service: BlogService;
  let blogRepo: any;
  let userService: any;
  let filesService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: FilesService,
          useValue: {
            attachFileToEntity: jest.fn(),
            detachFileFromEntity: jest.fn(),
            getFilesForEntity: jest.fn(),
            getFileRelationsForEntity: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Blog),
          useValue: {
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    blogRepo = module.get(getRepositoryToken(Blog));
    userService = module.get(UserService);
    filesService = module.get(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('syncs blog images when `imageIds` is provided (detach removed, attach added)', async () => {
    userService.findById.mockResolvedValue({ id: 10 });
    blogRepo.findOne.mockResolvedValue({ id: 77, userId: 10, title: 't' });

    // First save returns the updated blog entity.
    blogRepo.save.mockImplementation(async (entity: any) => entity);

    filesService.getFileRelationsForEntity.mockResolvedValue([
      { fileId: 1 },
      { fileId: 2 },
      { fileId: 3 },
    ]);
    filesService.getFilesForEntity.mockResolvedValue([
      { url: 'https://cdn/x4.jpg' },
      { url: 'https://cdn/x2.jpg' },
    ]);

    await service.update(
      77,
      { id: 10 } as any,
      {
        title: 'new',
        imageIds: [2, 4],
      } as any,
    );

    expect(filesService.detachFileFromEntity).toHaveBeenCalledWith(
      1,
      'blog',
      77,
    );
    expect(filesService.detachFileFromEntity).toHaveBeenCalledWith(
      3,
      'blog',
      77,
    );
    expect(filesService.attachFileToEntity).toHaveBeenCalledWith(4, 'blog', 77);
  });

  it('removes a blog (owner only) and detaches all related files', async () => {
    userService.findById.mockResolvedValue({ id: 10 });
    blogRepo.findOne.mockResolvedValue({ id: 77, userId: 10, title: 't' });

    filesService.getFileRelationsForEntity.mockResolvedValue([
      { fileId: 1 },
      { fileId: 2 },
    ]);

    await service.remove(77, { id: 10 } as any);

    expect(filesService.detachFileFromEntity).toHaveBeenCalledWith(
      1,
      'blog',
      77,
    );
    expect(filesService.detachFileFromEntity).toHaveBeenCalledWith(
      2,
      'blog',
      77,
    );
    expect(blogRepo.delete).toHaveBeenCalledWith(77);
  });
});
