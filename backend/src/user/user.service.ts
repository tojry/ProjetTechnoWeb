
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {from, Observable} from "rxjs";
import {User, UserDocument} from "./schema/user.schema";
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";

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

    // Méthode pour récupérer tous les users
    async getAllQuizz(): Promise<User[]> {
        return this.userModel.find().exec(); // Récupère tous les quiz de la collection
    }

    async findOne(id_tmp: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ id: id_tmp }).exec();
        return user ?? undefined; // Retourne undefined si aucun document trouvé
    }
}