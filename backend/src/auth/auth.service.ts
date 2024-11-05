import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {JwtService} from "@nestjs/jwt";
import {CreateAndPutUserDto} from "../user/dto/createAndPut-user.dto";
import * as bcrypt from 'bcryptjs';
import { catchError, from, map, mergeMap, Observable, of, throwError } from 'rxjs';
import { JWTEntity } from 'src/user/entities/jwt.entity';
import { UserDao } from 'src/user/dao/user.dao';

@Injectable()
export class AuthService {
    constructor(private _usersService: UserService, private _jwtService: JwtService)
    {}

    login(loginDto: CreateAndPutUserDto): Observable<JWTEntity> {
        
        return from(this._usersService.findLoginInfo(loginDto.username)).pipe(
            mergeMap((user) => 
                user
                    ? from(bcrypt.compare(loginDto.password, user.password)).pipe(
                        map((match) => {
                            if (!match) {
                                throw new UnauthorizedException('Invalid username or password');
                            }

                            const token = this._jwtService.sign({ userId: user.id });
                            return new JWTEntity({ token: token });
                        })
                    )
                    : throwError(() => new UnauthorizedException('Invalid username or password'))
            ),
            catchError((err) => throwError(() => err))
        );
    }

}