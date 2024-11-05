import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { Question } from "../schema/question.schema";

@Exclude()
export class QuestionEntity{

    @ApiProperty({
        name: 'question',
        description: 'Text of the question',
        example: 'What is the capital of France ?',
    })
    @Expose()
    @Type(() => String)
    question: string;

    @ApiProperty({
        name: 'answers',
        description: 'Answers of the question',
        example: ['Paris', 'London', 'Berlin'],
    })
    @Expose()
    @Type(() => String)
    answers: string[];

    @ApiProperty({
        name: 'correctAnswer',
        description: 'Index of the correct answer',
        example: 0,
    })
    @Expose()
    @Type(() => Number)
    correctAnswer: number;
}