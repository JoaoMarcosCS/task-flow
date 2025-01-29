import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/cors/cors.config';
import helmet from 'helmet';
import { swaggerConfig } from './config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  swaggerConfig(app);

  app.use(helmet());

  app.enableCors(corsConfig);

  await app
    .listen(process.env.PORT ?? 3001)
    .then(() => console.log(`🚀 Server on: http://localhost:3001/api/docs`));
}
bootstrap();
