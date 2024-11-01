import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class QuestionDto {

    @ApiProperty({
        name: 'question',
        description: 'Text of the question',
        example: 'What is the capital of France ?',
    })
    @IsString()
    @IsNotEmpty()
    readonly question: string;

    @ApiProperty({
        name: 'answers',
        description: 'Answers of the question',
        example: ['Paris', 'London', 'Berlin'],
    })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    readonly answers: string[];

    @ApiProperty({
        name: 'correctAnswer',
        description: 'Index of the correct answer',
        example: 0,
    })
    @IsNumber()
    readonly correctAnswer: number;
}