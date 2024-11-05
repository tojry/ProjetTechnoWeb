
import { ConflictException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {catchError, from, map, mergeMap, Observable, of, throwError} from "rxjs";
import {User, UserDocument} from "./schema/user.schema";
import {CreateAndPutUserDto} from "./dto/createAndPut-user.dto";
import {Quizz} from "../quiz/schema/quizz.schema";
import {CreateAndPutQuizzDto} from "../quiz/dto/createQuizz-dto";
import { UserEntity } from './entities/user.entity';
import { QuizzEntity } from 'src/quiz/entities/quizz.entity';
import { UserDao } from './dao/user.dao';
import * as bcrypt from 'bcrypt';
import { QuizzService } from 'src/quiz/quizz.service';

@Injectable()
export class UserService {
    constructor(
        private readonly _userDao: UserDao,
        @Inject(forwardRef(() => QuizzService))
        private readonly _quizService: QuizzService
    ) {}

    // Méthode pour créer un user
    createUser(user: CreateAndPutUserDto): Observable<UserEntity> {
        return this._hashPassword(user).pipe(
            mergeMap((hashedUser: CreateAndPutUserDto) => 
                this._userDao.save(hashedUser),
            ),
            map((savedUser) => new UserEntity(savedUser.username, [])),
            catchError((e) => 
                e.code === 11000
                ? throwError(() => new ConflictException('User with this username already exists'))
                : throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    findOne(id: string): Observable<UserEntity> {

        return from(this._userDao.findById(id)).pipe(
            mergeMap((user) => 
                !!user 
            ? this._quizService.findByAuthor(user.username).pipe(
                map((quizList) => new UserEntity(user.username, quizList)))
            : throwError(
                () => new NotFoundException(`User with id '${id}' not found`))
            ),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    findLoginInfo(username: string): Observable<{ id: string; password: string } | void> {
        return from(this._userDao.findByUsername(username)).pipe(
            mergeMap((user) => 
                !!user 
            ? of({id: user._id,password: user.password}) 
            : throwError(
                () => new UnauthorizedException('Invalid username or password'))
            ),
            catchError((e) => throwError(() => e))
        );
    }

    private _hashPassword(user: CreateAndPutUserDto) : Observable<CreateAndPutUserDto> {
        return from(bcrypt.genSalt(10)).pipe(
            mergeMap((salt) => bcrypt.hash(user.password, salt)),
            map((hash) => ({ ...user, password: hash })),
        );
    }

}