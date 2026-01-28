"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const files_service_1 = require("../files/files.service");
let UserService = class UserService {
    userRepo;
    filesService;
    constructor(userRepo, filesService) {
        this.userRepo = userRepo;
        this.filesService = filesService;
    }
    async create(data) {
        return this.userRepo.save(data).then((res) => {
            return {
                id: res.id,
                role: res.role,
                email: res.email,
                fullName: res.fullName,
            };
        });
    }
    createBaseQueryBuilder() {
        return this.userRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.profileImage', 'profileImage');
    }
    async findById(id) {
        return this.createBaseQueryBuilder()
            .where('user.id = :id', { id })
            .getOne();
    }
    async findByEmail(email) {
        return this.createBaseQueryBuilder()
            .where('user.email = :email', { email })
            .getOne();
    }
    async update(id, data) {
        await this.userRepo.update(id, data);
        return this.runUserData(await this.findById(id));
    }
    async updateProfileImage(userId, file) {
        const uploadedFile = await this.filesService.uploadFileDirectly(file, userId, 'profiles');
        await this.userRepo.update(userId, {
            profileImageId: uploadedFile.id,
        });
        return this.runUserData(await this.findById(userId));
    }
    async updateNotificationSetting(id, notificationsEnabled) {
        await this.userRepo.update(id, { notificationsEnabled });
        return this.runUserData(await this.findById(id));
    }
    runUserData(user) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        files_service_1.FilesService])
], UserService);
//# sourceMappingURL=user.service.js.map