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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/user.entity");
const file_relation_entity_1 = require("./file-relation.entity");
let FileEntity = class FileEntity {
    id;
    fileName;
    mimeType;
    size;
    bucketPath;
    url;
    userId;
    user;
    relations;
    createdAt;
    updatedAt;
};
exports.FileEntity = FileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], FileEntity.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], FileEntity.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], FileEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], FileEntity.prototype, "bucketPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], FileEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], FileEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Object)
], FileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => file_relation_entity_1.FileRelation, (relation) => relation.file),
    __metadata("design:type", Array)
], FileEntity.prototype, "relations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FileEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FileEntity.prototype, "updatedAt", void 0);
exports.FileEntity = FileEntity = __decorate([
    (0, typeorm_1.Entity)('files'),
    (0, typeorm_1.Index)(['bucketPath']),
    (0, typeorm_1.Index)(['userId'])
], FileEntity);
//# sourceMappingURL=file.entity.js.map