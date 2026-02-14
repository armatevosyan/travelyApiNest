import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
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

  async createSocialUser(data: {
    email: string;
    fullName?: string | null;
    googleId?: string | null;
    appleId?: string | null;
    provider: string;
    roleId: number;
  }): Promise<User> {
    const user = this.userRepo.create({
      ...data,
      fullName: data.fullName ?? data.email.split('@')[0],
      verifiedAt: new Date(),
      isActive: true,
    });
    return this.userRepo.save(user);
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

  /** Find user by email and provider (for sign-up check and social create check) */
  async findByEmailAndProvider(
    email: string,
    provider: string,
  ): Promise<User | null> {
    return this.createBaseQueryBuilder()
      .where('user.email = :email', { email })
      .andWhere('user.provider = :provider', { provider })
      .getOne();
  }

  /** Find the email/password user for sign-in (provider = email or legacy null) */
  async findByEmailForEmailLogin(email: string): Promise<User | null> {
    return this.createBaseQueryBuilder()
      .where('user.email = :email', { email })
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('user.provider = :provider')
            .orWhere('user.provider IS NULL'),
        ),
        { provider: 'email' },
      )
      .orderBy('user.provider', 'DESC') // prefer 'email' over null
      .getOne();
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.createBaseQueryBuilder()
      .where('user.googleId = :googleId', { googleId })
      .getOne();
  }

  async findByAppleId(appleId: string): Promise<User | null> {
    return this.createBaseQueryBuilder()
      .where('user.appleId = :appleId', { appleId })
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
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
