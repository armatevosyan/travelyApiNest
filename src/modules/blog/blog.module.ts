import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
 } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './blog.entity';
import { AuthMiddleware } from '@/common/middleware/auth.middleware';
import { UsersModule } from '@/modules/users/users.module';
import { CategoryModule } from '@/modules/categories/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UsersModule, CategoryModule],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService, TypeOrmModule],
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'blog', method: RequestMethod.POST });
  }
}
