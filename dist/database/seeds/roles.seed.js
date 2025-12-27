"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../modules/roles/role.entity");
const role_types_1 = require("../../modules/roles/role.types");
const roles = [
    {
        name: role_types_1.ERoles.SUPER_ADMIN,
        description: 'Has unrestricted access to all system features and settings. Manages admins and moderators.',
    },
    {
        name: role_types_1.ERoles.ADMIN,
        description: 'Manages users, businesses, and overall system operations, but cannot change SUPER_ADMIN settings.',
    },
    {
        name: role_types_1.ERoles.MODERATOR,
        description: 'Oversees user activity, reviews content, and enforces rules. Limited management abilities.',
    },
    {
        name: role_types_1.ERoles.BUSINESS,
        description: 'Represents a shop or company account. Can manage their own products, services, and staff.',
    },
    {
        name: role_types_1.ERoles.USER,
        description: 'Regular user with standard access. Can browse, purchase, or interact depending on app features.',
    },
];
class RoleSeeder {
    async run(dataSource) {
        const roleRepo = dataSource.getRepository(role_entity_1.Role);
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
exports.default = RoleSeeder;
//# sourceMappingURL=roles.seed.js.map