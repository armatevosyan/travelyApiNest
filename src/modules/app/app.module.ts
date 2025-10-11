import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { LoggerMiddleware } from 'common/middleware/logger.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { databaseConfig } from 'database/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(
          process.cwd(),
          process.env.NODE_ENV === 'production' ? 'dist/i18n/' : 'src/i18n/',
        ),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // logs all routes
  }
}
