import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {JwtService} from "@nestjs/jwt";
import {CreateAndPutUserDto} from "../user/dto/createAndPut-user.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService)
    {}

    async validateUser(id: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(id);
        if (user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(loginDto: CreateAndPutUserDto): Promise<{ token: string }> {
        const { id, password } = loginDto;

        const user = await this.usersService.findOne( id );

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = user.password === password

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtService.sign({ id: user.id });

        return { token };
    }

}