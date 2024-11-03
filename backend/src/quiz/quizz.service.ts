
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz, QuizzDocument } from './schema/quizz.schema';
import {CreateAndPutQuizzDto} from "./dto/createQuizz-dto";
import {from, Observable} from "rxjs";
import {User} from "../user/schema/user.schema";
import {ObjectId} from "mongodb";

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

    async findOne(id_tmp: string): Promise<Quizz | undefined> {
        const quizz = await this.quizzModel.findOne({ _id: id_tmp }).exec();
        return quizz ?? undefined; // Retourne undefined si aucun document trouvé
    }

    async modify(id: string, createAndPutQuizzDto: CreateAndPutQuizzDto): Promise<Quizz | undefined> {
        return this.quizzModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    author: createAndPutQuizzDto.author,
                    title: createAndPutQuizzDto.title,
                    category: createAndPutQuizzDto.category,
                    questions: createAndPutQuizzDto.questions
                }
            },
            { new: true } // Retourne le document mis à jour
        ).exec();
    }

    async delete(id: string): Promise<Quizz | null> {
        return this.quizzModel.findByIdAndDelete(id).exec();
    }

    async findByCategory(categoryName: string): Promise<Quizz[]> {
        return this.quizzModel.find({ category: categoryName }).exec();
    }


}