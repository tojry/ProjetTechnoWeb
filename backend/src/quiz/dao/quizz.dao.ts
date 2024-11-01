import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { Quizz } from '../schema/quizz.schema';
import {CreateAndPutQuizzDto} from "../dto/createQuizz-dto";

@Injectable()
export class QuizzDao {
    constructor(
        @InjectModel(Quizz.name)
        private readonly _quizzModel: Model<Quizz>,
    ) {}

    findById = (id: string): Observable<Quizz | void> =>
        from(this._quizzModel.findById(id));

    save = (quizz: CreateAndPutQuizzDto): Observable<Quizz> =>
        from(new this._quizzModel(quizz).save());


}