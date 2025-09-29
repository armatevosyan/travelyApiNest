import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '@/modules/roles/role.entity';
import { ERoles } from '@/modules/roles/role.types';

type RoleData = Omit<Role, 'id' | 'users'>;

const roles: RoleData[] = [
  {
    name: ERoles.SUPER_ADMIN,
    description:
      'Has unrestricted access to all system features and settings. Manages admins and moderators.',
  },
  {
    name: ERoles.ADMIN,
    description:
      'Manages users, businesses, and overall system operations, but cannot change SUPER_ADMIN settings.',
  },
  {
    name: ERoles.MODERATOR,
    description:
      'Oversees user activity, reviews content, and enforces rules. Limited management abilities.',
  },
  {
    name: ERoles.BUSINESS,
    description:
      'Represents a shop or company account. Can manage their own products, services, and staff.',
  },
  {
    name: ERoles.USER,
    description:
      'Regular user with standard access. Can browse, purchase, or interact depending on app features.',
  },
];

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const roleRepo = dataSource.getRepository(Role);

    console.log('🟢 Seeding roles...');

    for (const role of roles) {
      const exists = await roleRepo.findOne({ where: { name: role.name } });

      if (exists) {
        console.log(`⚠ Role "${role.name}" already exists, skipping.`);
        continue;
      }

      const newRole = roleRepo.create(role);
      await roleRepo.save(newRole);
      console.log(`✅ Role "${role.name}" created.`);
    }

    console.log('🎉 Role seeding completed!');
  }
}
