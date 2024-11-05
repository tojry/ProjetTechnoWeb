import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { QuizzModule } from './quiz/quizz.module';
import { UserModule } from './user/user.module';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {

  const httpsOptions = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, https: httpsOptions }),
  );

  app.enableCors({ origin: config.cors });

  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

// create swagger options
const options = new DocumentBuilder()
  .setTitle(swaggerConfig.title)
  .setDescription(swaggerConfig.description)
  .setVersion(swaggerConfig.version)
  .addTag(swaggerConfig.tag)
  .build(); 

// create swagger document
const quizDocument = SwaggerModule.createDocument(app, options, {
  include: [QuizzModule, UserModule],
});

// setup swagger module
SwaggerModule.setup(swaggerConfig.path, app, quizDocument);


  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at https://${config.host}:${config.port}`,
    'bootstrap',
  );
}

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
