import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from 'modules/app/app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

dotenv.config();

const port = process.env.PORT ?? 8000;
const API_URL = process.env.API_URL ?? `http://localhost:${port}`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true, // strips properties that are not in DTO
      forbidNonWhitelisted: true, // throws error if extra fields provided
      transform: true, // transforms payloads to DTO classes
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`🚀 Server is running on ${API_URL}/api`);
  })
  .catch((e) => {
    console.error('Error - ', e);
  });
