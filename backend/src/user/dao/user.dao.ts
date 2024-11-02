import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { User } from '../schema/user.schema';
import {CreateAndPutUserDto} from "../dto/createAndPut-user.dto";

@Injectable()
export class UserDao {
    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<User>,
    ) {}

    findById = (id: string): Observable<User | void> =>
        from(this._userModel.findById(id));

    save = (user: CreateAndPutUserDto): Observable<User> =>
        from(new this._userModel(user).save());


}