import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { QuizzEntity } from "src/quiz/entities/quizz.entity";
import { User } from "../schema/user.schema";

@Exclude()
export class UserEntity{

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @ApiProperty({
        name: 'username',
        description: 'Username (unique)',
        example: 'UserTest',
    })
    @Expose()
    @Type(() => String)
    username : string;

    @ApiProperty({
        name: 'createdQuizs',
        description: 'List of the quiz created by the user',
        type: [QuizzEntity],
    })
    @Expose()
    @Type(() => QuizzEntity)
    createdQuizs : QuizzEntity[];
}