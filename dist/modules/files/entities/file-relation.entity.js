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
exports.FileRelation = exports.FileRelationType = void 0;
const typeorm_1 = require("typeorm");
const file_entity_1 = require("./file.entity");
var FileRelationType;
(function (FileRelationType) {
    FileRelationType["USER"] = "user";
    FileRelationType["PLACE"] = "place";
    FileRelationType["BLOG"] = "blog";
})(FileRelationType || (exports.FileRelationType = FileRelationType = {}));
let FileRelation = class FileRelation {
    id;
    fileId;
    file;
    entityType;
    entityId;
    createdAt;
};
exports.FileRelation = FileRelation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileRelation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FileRelation.prototype, "fileId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.FileEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'fileId' }),
    __metadata("design:type", file_entity_1.FileEntity)
], FileRelation.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], FileRelation.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FileRelation.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FileRelation.prototype, "createdAt", void 0);
exports.FileRelation = FileRelation = __decorate([
    (0, typeorm_1.Entity)('file_relations'),
    (0, typeorm_1.Index)(['entityType', 'entityId']),
    (0, typeorm_1.Index)(['fileId'])
], FileRelation);
//# sourceMappingURL=file-relation.entity.js.map