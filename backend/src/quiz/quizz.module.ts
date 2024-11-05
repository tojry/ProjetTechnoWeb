import { forwardRef, Module } from '@nestjs/common';
import { QuizzController } from './quizz.controller';
import {QuizzService} from "./quizz.service";
import {QuizzDao} from "./dao/quizz.dao";
import {MongooseModule} from "@nestjs/mongoose";
import {Quizz, QuizzSchema} from "./schema/quizz.schema";
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Quizz.name, schema: QuizzSchema }]),
        forwardRef(() => UserModule)
    ],
    controllers: [QuizzController],
    providers: [QuizzService, QuizzDao],
    exports: [QuizzService, QuizzDao]
})
export class QuizzModule {}