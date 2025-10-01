import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from 'modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

const port = process.env.PORT ?? 8000;
const API_URL = process.env.API_URL ?? `http://localhost:${port}`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that are not in DTO
      forbidNonWhitelisted: true, // throws error if extra fields provided
      transform: true, // transforms payloads to DTO classes
    }),
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
