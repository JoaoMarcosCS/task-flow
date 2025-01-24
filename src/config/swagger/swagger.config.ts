import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Task Flow')
  .setDescription('Documentação da API do projeeto Task Flow')
  .setVersion('1.0')
  .addTag('examples')
  .build();
