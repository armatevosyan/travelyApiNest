"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_extension_1 = require("typeorm-extension");
const typeorm_1 = require("typeorm");
const roles_seed_1 = __importDefault(require("./roles.seed"));
const users_seed_1 = __importDefault(require("./users.seed"));
const category_seed_1 = __importDefault(require("./category.seed"));
const location_seed_1 = __importDefault(require("./location.seed"));
const facility_seed_1 = __importDefault(require("./facility.seed"));
const place_option_seed_1 = __importDefault(require("./place-option.seed"));
const db_config_1 = require("../db.config");
async function bootstrap() {
    console.log('🟢 Starting database seeding...');
    const AppDataSource = new typeorm_1.DataSource(db_config_1.databaseConfig);
    try {
        await AppDataSource.initialize();
        console.log('✅ Database connection established.');
        await (0, typeorm_extension_1.runSeeder)(AppDataSource, roles_seed_1.default);
        await (0, typeorm_extension_1.runSeeder)(AppDataSource, users_seed_1.default);
        await (0, typeorm_extension_1.runSeeder)(AppDataSource, category_seed_1.default);
        await (0, typeorm_extension_1.runSeeder)(AppDataSource, location_seed_1.default);
        await (0, typeorm_extension_1.runSeeder)(AppDataSource, facility_seed_1.default);
        await (0, typeorm_extension_1.runSeeder)(AppDataSource, place_option_seed_1.default);
    }
    catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
    finally {
        await AppDataSource.destroy();
        console.log('🛑 Database connection closed.');
    }
}
bootstrap()
    .then(() => {
    console.log('🎉 Database seeding completed successfully.');
})
    .catch((err) => {
    console.log('❌ Error seeding database:', err);
});
//# sourceMappingURL=index.js.map