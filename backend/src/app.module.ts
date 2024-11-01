import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {QuizzModule} from "./quiz/quizz.module";
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [
      MongooseModule.forRoot(Config.get<string>('mongodb.uri'), {
    serverApi: { version: '1', strict: true, deprecationErrors: true }
    }),
      UserModule, QuizzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
