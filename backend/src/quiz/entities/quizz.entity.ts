import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { QuestionEntity } from "./question.entity";
import { Quizz } from "../schema/quizz.schema";

@Exclude()
export class QuizzEntity {

    constructor(partial: Partial<Quizz>) {

       this.id = partial._id;
       this.author = partial.author;
       this.title = partial.title;
       this.category = partial.category;
       this.questions = partial.questions;
    }

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
        example: 2,
    })
    @Expose()
    @Type(() => Number)
    category: number;

    @ApiProperty({
        name: 'questions',
        description: 'Questions of the quizz',
        type: [QuestionEntity],
    })
    @Expose()
    @Type(() => QuestionEntity)
    questions: QuestionEntity[];
}