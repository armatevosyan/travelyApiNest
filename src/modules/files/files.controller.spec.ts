import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { I18nService } from 'nestjs-i18n';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@/modules/users/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('FilesController', () => {
  let controller: FilesController;
  const filesService = {
    uploadFileDirectly: jest.fn(),
    findByUserId: jest.fn(),
    deleteFile: jest.fn(),
  };
  const userRepository = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        {
          provide: FilesService,
          useValue: filesService,
        },
        {
          provide: I18nService,
          useValue: {
            translate: (key: string) => key,
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('updates user.profileImageId when uploading a single image to folder=user', async () => {
    filesService.uploadFileDirectly.mockResolvedValueOnce({ id: 123 });

    const res = await controller.createFile(
      7,
      [
        {
          originalname: 'profile.jpg',
          mimetype: 'image/jpeg',
          size: 10,
          buffer: Buffer.from('x'),
        } as any,
      ],
      'user',
    );

    expect(userRepository.update).toHaveBeenCalledWith(7, {
      profileImageId: 123,
    });
    expect(res.data).toEqual({ id: 123 });
  });

  it('throws when userId is missing/invalid (prevents empty-criteria update)', async () => {
    await expect(
      controller.createFile(
        undefined as any,
        [
          {
            originalname: 'profile.jpg',
            mimetype: 'image/jpeg',
            size: 10,
            buffer: Buffer.from('x'),
          } as any,
        ],
        'user',
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(filesService.uploadFileDirectly).not.toHaveBeenCalled();
    expect(userRepository.update).not.toHaveBeenCalled();
  });

  it('does not update user.profileImageId when folder is not user', async () => {
    filesService.uploadFileDirectly.mockResolvedValueOnce({ id: 124 });

    await controller.createFile(
      7,
      [
        {
          originalname: 'other.jpg',
          mimetype: 'image/jpeg',
          size: 10,
          buffer: Buffer.from('x'),
        } as any,
      ],
      'places',
    );

    expect(userRepository.update).not.toHaveBeenCalled();
  });
});
