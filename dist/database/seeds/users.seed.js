"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../modules/users/user.entity");
const role_entity_1 = require("../../modules/roles/role.entity");
const role_types_1 = require("../../modules/roles/role.types");
const bcrypt = __importStar(require("bcrypt"));
const defaultUsers = [
    {
        fullName: 'Super Administrator',
        email: 'arman@travely.life',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.SUPER_ADMIN,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Super Administrator',
        email: 'armen@travely.life',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.SUPER_ADMIN,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Moderator',
        email: 'moderator@travely.life',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.MODERATOR,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Business',
        email: 'business@travely.life',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.BUSINESS,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Administrator',
        email: 'admin@travely.life',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.ADMIN,
        verifiedAt: new Date(),
    },
    {
        fullName: 'User',
        email: 'user@travely.life',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.USER,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Arman',
        email: 'armann.davtyan@gmail.com',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.USER,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Davtyan',
        email: 'armann.davtyan+1@gmail.com',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.USER,
        verifiedAt: new Date(),
    },
    {
        fullName: 'Davtyan',
        email: 'armann.davtyan+3@gmail.com',
        password: 'Travely123#',
        language: 'en',
        isActive: true,
        role: role_types_1.ERoles.USER,
        verifiedAt: new Date(),
    },
];
class UserSeeder {
    async run(dataSource) {
        const userRepo = dataSource.getRepository(user_entity_1.User);
        const roleRepo = dataSource.getRepository(role_entity_1.Role);
        console.log('🟢 Seeding users...');
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
            const roleId = roleMap.get(role);
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = userRepo.create({
                ...rest,
                password: hashedPassword,
                roleId: roleId,
            });
            await userRepo.save(newUser);
            console.log(`✅ User "${rest.email}" created with role: ${role} roleId: ${roleId}`);
        }
        console.log('🎉 User seeding completed!');
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=users.seed.js.map