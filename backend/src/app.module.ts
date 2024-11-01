import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user/user.module";
import {QuizzModule} from "./quiz/quizz.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://matthieugalante:hzMKl4e8jb5VvWIK@cluster0.fdds4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    }),
      UserModule, QuizzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
