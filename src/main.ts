import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './shared/providers/HttpExceptionFilter';
import { setupSwagger } from './setup-swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});


  const configService = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('/api/v1');
  
  app.enableCors({
    origin: '*',
    methods: 'GET',
    credentials: true,
  });
  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  if (!['production'].includes(configService.get('ENV'))) {
    setupSwagger(app);
  }

  const port = process.env.PORT;
  await app.listen(port);
  console.info(
    `server running on port ${port} ENV ${configService.get('ENV')}`,
  );
}

bootstrap();
