import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { Role } from '@/modules/roles/role.entity';
import { AuthMiddleware } from 'common/middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) // middleware chain
      .forRoutes({ path: 'users/me', method: RequestMethod.GET });
  }
}
