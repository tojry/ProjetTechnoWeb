import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schema/user.schema";
import {UserService} from "./user.service";
import {UserDao} from "./dao/user.dao";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService, UserDao]
})
export class UserModule {}