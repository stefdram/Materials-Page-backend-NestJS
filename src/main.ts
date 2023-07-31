import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppModule2 } from './app2.module';
import cors from "cors";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  await app.listen(4000);
  console.log("User server on port", 4000);
  const app2 = await NestFactory.create(AppModule2);
  app2.useGlobalPipes(new ValidationPipe());
  app2.use(cors());
  await app2.listen(4001);
  console.log('Material server on port', 4001);

}
bootstrap();
