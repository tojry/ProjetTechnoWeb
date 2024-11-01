import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { QuestionEntity } from "./question.entity";

@Exclude()
export class QuizzEntity {

    @ApiProperty({
        name: 'id',
        description: 'Unique identifier in the database',
        example: '5763cd4dc368a38acd387737',
    })
    @Expose()
    @Type(() => String)
    id : string;

    @ApiProperty({
        name: 'author',
        description: 'Author of the quizz',
        example: 'UserTest',
    })
    @Expose()
    @Type(() => String)
    author: string;

    @ApiProperty({
        name: 'title',
        description: 'Title of the quizz',
        example: 'Le super quiz',
    })
    @Expose()
    @Type(() => String)
    title : string;

    @ApiProperty({
        name: 'category',
        description: 'Category of the quizz',
        example: 'Sport',
    })
    category: string;

    @ApiProperty({
        name: 'questions',
        description: 'Questions of the quizz',
        type: [QuestionEntity],
    })
    @Expose()
    @Type(() => QuestionEntity)
    questions: QuestionEntity[];
}