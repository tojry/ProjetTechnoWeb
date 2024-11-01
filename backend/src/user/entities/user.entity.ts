import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { QuizzEntity } from "src/quiz/entities/quizz.entity";

@Exclude()
export class UserEntity{

    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database (username)',
        example: 'UserTest',
    })
    @Expose()
    @Type(() => String)
    id : string;

    @ApiProperty({
        name: 'createdQuizs',
        description: 'List of the quiz created by the user',
        type: [QuizzEntity],
    })
    @Expose()
    @Type(() => QuizzEntity)
    createdQuizs : QuizzEntity[];
}