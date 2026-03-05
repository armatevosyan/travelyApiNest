import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './user.entity';
import { FilesService } from '@/modules/files/files.service';

import { EAuthProvider, SignupData } from '@/modules/auth/auth.types';
import type { MulterFile } from '@/types/upload';

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
    email: string | null | undefined;
    fullName?: string | null;
    googleId?: string | null;
    appleId?: string | null;
    provider: EAuthProvider;
    roleId: number;
  }): Promise<User> {
    const fullName =
      data.fullName ?? (data.email ? data.email.split('@')[0] : undefined);
    const user = this.userRepo.create({
      ...data,
      email: data.email ?? null,
      fullName: fullName ?? undefined,
      verifiedAt: new Date(),
      isActive: true,
    });
    return this.userRepo.save(user);
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
    provider: EAuthProvider,
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
        { provider: EAuthProvider.EMAIL },
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

  async updateProfileImage(userId: number, file: MulterFile) {
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

  /**
   * Admin: list users with pagination, search, sort. Excludes password.
   */
  async findAllForAdmin(query: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: 'ASC' | 'DESC';
  }): Promise<{ data: any[]; total: number }> {
    const page = Math.max(0, query.page ?? 1) - 1;
    const limit = Math.min(100, Math.max(1, query.limit ?? 10));
    const sort = query.sort || 'createdAt';
    const order = query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const qb = this.createBaseQueryBuilder();

    if (query.search && query.search.trim()) {
      const search = `%${query.search.trim().replace(/[%_\\]/g, '\\$&')}%`;
      qb.andWhere(
        "(user.email ILIKE :search ESCAPE '\\' OR user.fullName ILIKE :search ESCAPE '\\')",
        { search },
      );
    }

    const validSortColumns = [
      'id',
      'fullName',
      'email',
      'createdAt',
      'updatedAt',
    ];
    const sortColumn = validSortColumns.includes(sort) ? sort : 'createdAt';
    qb.orderBy(`user.${sortColumn}`, order);

    const [users, total] = await qb
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    const data = users.map((u) => {
      const { password: _p, ...rest } = u as User & { password?: string };
      return {
        ...rest,
        name: u.fullName,
        avatar: u.profileImage?.id,
      };
    });

    return { data, total };
  }

  /** Admin: deactivate a user (sets deactivatedAt, isActive false, optional reason). */
  async deactivateUser(id: number, reason?: string | null): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepo.update(id, {
      deactivatedAt: new Date(),
      isActive: false,
      deactivationReason: reason ?? null,
    });
    return (await this.findById(id)) as User;
  }

  /** Admin: reactivate a user (clears deactivatedAt, isActive true, deactivationReason). */
  async activateUser(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepo.update(id, {
      deactivatedAt: null,
      isActive: true,
      deactivationReason: null,
    });
    return (await this.findById(id)) as User;
  }

  private createBaseQueryBuilder(): SelectQueryBuilder<User> {
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.profileImage', 'profileImage');
  }
}
