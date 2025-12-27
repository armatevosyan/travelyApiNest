"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tag_entity_1 = require("./tag.entity");
const tag_service_1 = require("./tag.service");
const tag_controller_1 = require("./tag.controller");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const users_module_1 = require("../users/users.module");
let TagModule = class TagModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'tags', method: common_1.RequestMethod.POST });
    }
};
exports.TagModule = TagModule;
exports.TagModule = TagModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tag_entity_1.Tag]), users_module_1.UsersModule],
        providers: [tag_service_1.TagService],
        controllers: [tag_controller_1.TagController],
        exports: [tag_service_1.TagService],
    })
], TagModule);
//# sourceMappingURL=tag.module.js.map