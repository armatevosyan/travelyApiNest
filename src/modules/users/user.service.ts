import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { SignupData } from '@/modules/auth/auth.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

  async findById(id: number) {
    return this.userRepo
      .findOneBy({ id })
      .then((user) => this.runUserData(user));
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async update(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.findById(id);
  }

  runUserData(user: User | null) {
    return {
      id: user?.id,
      fullName: user?.fullName,
      email: user?.email,
      image: user?.image,
      phone: user?.phone,
      website: user?.website,
      role: user?.role,
      description: user?.description,
      language: user?.language,
      isActive: user?.isActive,
      verifiedAt: user?.verifiedAt,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }
}
