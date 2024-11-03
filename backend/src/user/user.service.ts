
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {from, Observable} from "rxjs";
import {User, UserDocument} from "./schema/user.schema";
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";
import {Quizz} from "../quiz/schema/quizz.schema";
import {CreateAndPutQuizzDto} from "../quiz/dto/createQuizz-dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    // Méthode pour créer un user
    createUser(user: CreateAndPutUserDto): Observable<UserDocument> {
        const newUser = new this.userModel(user);
        return from(newUser.save()); // Convertit la Promise en Observable
    }

    async findOne(id_tmp: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ id: id_tmp }).exec();
        return user ?? undefined; // Retourne undefined si aucun document trouvé
    }

    async delete(id: string): Promise<User | null> {
        return this.userModel.findOneAndDelete({ id: id }).lean().exec();
    }

    async modify(id_tmp: string, createAndPutUserDto: CreateAndPutUserDto): Promise<User | undefined> {
        return this.userModel.findOneAndUpdate(
            { id: id_tmp },
            {
                $set: {
                    id: createAndPutUserDto.id,
                    password: createAndPutUserDto.password,
                }
            },
            { new: true } // Retourne le document mis à jour
        ).exec();
    }
}