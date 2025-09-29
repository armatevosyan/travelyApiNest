import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: Partial<User>) {
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
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }
}
