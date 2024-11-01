import { Module } from '@nestjs/common';
import { QuizzController } from './quizz.controller';
import {QuizzService} from "./quizz.service";
import {QuizzDao} from "./dao/quizz.dao";
import {MongooseModule} from "@nestjs/mongoose";
import {Quizz, QuizzSchema} from "./schema/quizz.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Quizz.name, schema: QuizzSchema }]),
    ],
    controllers: [QuizzController],
    providers: [QuizzService, QuizzDao]
})
export class QuizzModule {}