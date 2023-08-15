import { NestFactory } from '@nestjs/core';
import { SchemaModule } from './schema.module';

async function bootstrap() {
  const app = await NestFactory.create(SchemaModule);
  await app.init();
}

bootstrap();
