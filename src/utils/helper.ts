import * as packageJSON from '@/../package.json';
import { AllConfigType } from '@config/config.type';
import { AppModule } from '@modules/app';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NodeEnv } from '@shared/enums';
import { Logger } from 'nestjs-pino';
import validationOptions from './validate-options';

export function initialize(app: INestApplication): void {
  app.useLogger(app.get(Logger));
  app.enableVersioning();

  const configService = app.get(ConfigService<AllConfigType>);
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // For Swagger UI
  if (
    configService.getOrThrow('app.nodeEnv', { infer: true }) ===
    NodeEnv.DEVELOPMENT
  ) {
    app.enableCors();
  }
  const options = new DocumentBuilder()
    .setTitle(packageJSON.name)
    .setDescription(packageJSON.description)
    .setVersion(packageJSON.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
