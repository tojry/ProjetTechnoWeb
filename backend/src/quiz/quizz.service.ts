
import { ConflictException, forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import {CreateAndPutQuizzDto} from "./dto/createQuizz-dto";
import {catchError, defaultIfEmpty, from, map, mergeMap, Observable, of, throwError} from "rxjs";
import { QuizzDao } from './dao/quizz.dao';
import { QuizzEntity } from './entities/quizz.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class QuizzService {
    constructor(
        private readonly _quizzDao: QuizzDao,
        @Inject(forwardRef(() => UserService))
        private readonly _userService: UserService
    ) {}

    // Méthode pour créer un quizz
    createQuizz(quizz: CreateAndPutQuizzDto): Observable<QuizzEntity> {
        return from(this._quizzDao.save(quizz)).pipe(
            map((q) => new QuizzEntity(q)),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    // Méthode pour récupérer tous les quizz
    getAllQuizz(): Observable<QuizzEntity[]> {
        return from(this._quizzDao.find()).pipe(
            map((q) => (q || []).map((q) => new QuizzEntity(q))),
            defaultIfEmpty([]),
        );
    }

    findOne(id: string): Observable<QuizzEntity> {
        return from(this._quizzDao.findById(id)).pipe(
            mergeMap((q) => 
                !!q 
            ? of(new QuizzEntity(q)) 
            : throwError(
                () => new NotFoundException(`Quiz with id '${id}' not found`))
            ),
            catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
        );
    }

    modify(id: string, quiz: CreateAndPutQuizzDto, userId: string): Observable<QuizzEntity> {
        return from(this._userService.findOne(userId)).pipe(
            mergeMap((user) => 
                this.findOne(id).pipe(
                    mergeMap((q) => 
                        q.author === user.username
                            ? from(this._quizzDao.findOneAndUpdate(id, quiz)).pipe(
                                mergeMap((quizUpdated) => 
                                    !!quizUpdated
                                        ? of(new QuizzEntity(quizUpdated))
                                        : throwError(() => new NotFoundException(`Quiz with id '${id}' not found`))
                                ),
                                catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
                            )
                            : throwError(() => new UnauthorizedException("You can't modify this quiz"))
                    ),
                )
            ),
            catchError((e) => throwError(() => e))
        );
    }

    delete(id: string, userId: string): Observable<void> {

        return from(this._userService.findOne(userId)).pipe(
            mergeMap((user) => 
                this.findOne(id).pipe(
                    mergeMap((q) => 
                        q.author === user.username
                            ? from(this._quizzDao.findOneAndDelete(id)).pipe(
                                mergeMap((quizDeleted) => 
                                    !!quizDeleted
                                        ? of(undefined)
                                        : throwError(() => new NotFoundException(`Quiz with id '${id}' not found`))
                                ),
                                catchError((e) => throwError(() => new UnprocessableEntityException(e.message)))
                            )
                            : throwError(() => new UnauthorizedException("You can't delete this quiz"))
                    ),
                )
            ),
            catchError((e) => throwError(() => e))
        );
    }

    findByCategory(categoryId: number): Observable<QuizzEntity[]> {
        return from(this._quizzDao.findByCategory(categoryId)).pipe(
            map((q) => (q || []).map((q) => new QuizzEntity(q))),
            defaultIfEmpty([]),
        );
    }

    findByAuthor(author: string): Observable<QuizzEntity[]> {
        return from(this._quizzDao.findByAuthor(author)).pipe(
            map((q) => (q || []).map((q) => new QuizzEntity(q))),
            defaultIfEmpty([]),
        );
    }


}