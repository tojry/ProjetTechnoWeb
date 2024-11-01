
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz, QuizzDocument } from './schema/quizz.schema';
import {CreateAndPutQuizzDto} from "./dto/createQuizz-dto";
import {from, Observable} from "rxjs";

@Injectable()
export class QuizzService {
    constructor(
        @InjectModel(Quizz.name)
        private readonly quizzModel: Model<QuizzDocument>,
    ) {}

    // Méthode pour créer un quizz
    createQuizz(quizz: CreateAndPutQuizzDto): Observable<QuizzDocument> {
        const newQuizz = new this.quizzModel(quizz);
        return from(newQuizz.save()); // Convertit la Promise en Observable
    }

    // Méthode pour récupérer tous les quizz
    async getAllQuizz(): Promise<Quizz[]> {
        return this.quizzModel.find().exec(); // Récupère tous les quiz de la collection
    }
}