import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@/modules/users/user.entity';
import { Role } from '@/modules/roles/role.entity';
import { ERoles } from '@/modules/roles/role.types';

import * as bcrypt from 'bcrypt';

interface IUser {
  fullName: string;
  email: string;
  password: string;
  language: string;
  isActive: boolean;
  verifiedAt?: Date;
  role: ERoles;
}

const defaultUsers: IUser[] = [
  {
    fullName: 'Super Administrator',
    email: 'arman@travely.life',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.SUPER_ADMIN,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Super Administrator',
    email: 'armen@travely.life',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.SUPER_ADMIN,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Moderator',
    email: 'moderator@travely.life',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.MODERATOR,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Business',
    email: 'business@travely.life',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.BUSINESS,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Administrator',
    email: 'admin@travely.life',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.ADMIN,
    verifiedAt: new Date(),
  },
  {
    fullName: 'User',
    email: 'user@travely.life',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.USER,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Arman',
    email: 'armann.davtyan@gmail.com',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.USER,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Davtyan',
    email: 'armann.davtyan+1@gmail.com',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.USER,
    verifiedAt: new Date(),
  },
  {
    fullName: 'Davtyan',
    email: 'armann.davtyan+3@gmail.com',
    password: 'Travely123#', // This will be hashed
    language: 'en',
    isActive: true,
    role: ERoles.USER,
    verifiedAt: new Date(),
  },
];

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(User);
    const roleRepo = dataSource.getRepository(Role);

    console.log('🟢 Seeding users...');

    // Get all roles to map role names to IDs
    const roles = await roleRepo.find();
    const roleMap = new Map(roles.map((role) => [role.name, role.id]));

    for (const data of defaultUsers) {
      const exists = await userRepo.findOne({
        where: { email: data.email },
      });

      if (exists) {
        console.log(`⚠ User "${data.email}" already exists, skipping.`);
        continue;
      }
      const { role, ...rest } = data;
      const roleId = roleMap.get(role); // Use .get() method for Map

      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Create user with hashed password
      const newUser = userRepo.create({
        ...rest,
        password: hashedPassword,
        roleId: roleId, // Use the roleId from the Map
      });

      await userRepo.save(newUser);
      console.log(
        `✅ User "${rest.email}" created with role: ${role} roleId: ${roleId}`,
      );
    }

    console.log('🎉 User seeding completed!');
  }
}
