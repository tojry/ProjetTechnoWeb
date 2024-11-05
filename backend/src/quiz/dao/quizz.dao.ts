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

    /*
    async onModuleInit() {
        await this._quizzModel.syncIndexes();
    }*/

    find = (): Observable<Quizz[]> =>
        from(this._quizzModel.find({})).pipe(map((quiz) => [].concat(quiz)));

    findById = (id: string): Observable<Quizz | void> =>
        from(this._quizzModel.findById(id));

    save = (quizz: CreateAndPutQuizzDto): Observable<Quizz> =>
        from(new this._quizzModel(quizz).save());

    findOneAndUpdate = (
        id: string,
        quiz: CreateAndPutQuizzDto,
      ): Observable<Quizz | void> =>
        from(
          this._quizzModel.findByIdAndUpdate(id, quiz, {
            new: true,
            runValidators: true,
          }),
        );

    findOneAndDelete(id: string): Observable<Quizz | void> {
        return from(this._quizzModel.findByIdAndDelete(id));
    }

    findByCategory = (categoryId: number): Observable<Quizz[]> =>
        from(this._quizzModel.find({ category: categoryId })).pipe(map((quiz) => [].concat(quiz)));

    findByAuthor = (author: string): Observable<Quizz[]> =>
        from(this._quizzModel.find({ author: author })).pipe(map((quiz) => [].concat(quiz)));

    searchByTitle = (keyword: string): Observable<Quizz[]> =>
        from(this._quizzModel.find({ $text: { $search: keyword } })).pipe(map((quiz) => [].concat(quiz)));

}