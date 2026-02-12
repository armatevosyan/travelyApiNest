import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';
import { FilesService } from '@/modules/files/files.service';

import { SignupData } from '@/modules/auth/auth.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  async create(data: SignupData) {
    return this.userRepo.save(data).then((res) => {
      return {
        id: res.id,
        role: res.role,
        email: res.email,
        fullName: res.fullName,
      };
    });
  }

  private createBaseQueryBuilder(): SelectQueryBuilder<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.profileImage', 'profileImage');
  }

  async findById(id: number): Promise<User | null> {
    return this.createBaseQueryBuilder()
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.createBaseQueryBuilder()
      .where('user.email = :email', { email })
      .getOne();
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.runUserData(await this.findById(id));
  }

  async updateProfileImage(userId: number, file: Express.Multer.File) {
    const uploadedFile = await this.filesService.uploadFileDirectly(
      file,
      userId,
      'profiles',
    );

    await this.userRepo.update(userId, {
      profileImageId: uploadedFile.id,
    });
    return this.runUserData(await this.findById(userId));
  }

  async updateNotificationSetting(id: number, notificationsEnabled: boolean) {
    await this.userRepo.update(id, { notificationsEnabled });
    return this.runUserData(await this.findById(id));
  }

  runUserData(user: User | null) {
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      phone: user.phone,
      website: user.website,
      role: user.role,
      description: user.description,
      language: user.language,
      isActive: user.isActive,
      verifiedAt: user.verifiedAt,
      notificationsEnabled: user.notificationsEnabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
