import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger/swagger.config';
import { corsConfig } from './config/cors/cors.config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document); // Acesse a documentação em /doc

  app.use(helmet());

  app.enableCors(corsConfig);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
