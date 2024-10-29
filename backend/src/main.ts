import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig } from './app.types';
import * as fs from 'fs';

async function bootstrap(config: AppConfig) {

  const httpsOptions = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, https: httpsOptions }),
  );
  app.enableCors({ origin: config.cors });
  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at https://${config.host}:${config.port}`,
    'bootstrap',
  );
}

bootstrap(Config.get<AppConfig>('server'));
