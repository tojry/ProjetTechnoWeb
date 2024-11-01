import { ApiProperty } from "@nestjs/swagger";
import {Question} from "../schema/question.schema";
import { IsInstance, IsNotEmpty, IsString, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { QuestionDto } from "./question.dto";

export class CreateAndPutQuizzDto {

    @ApiProperty({
        name: 'author',
        description: 'Author of the quiz',
        example: 'UserTest',
    })
    @IsString()
    @IsNotEmpty()
    readonly author : string;

    @ApiProperty({
        name: 'title',
        description: 'Title of the quiz',
        example: 'Le super quiz',
    })
    @IsString()
    @IsNotEmpty()
    readonly title : string;

    @ApiProperty({
        name: 'category',
        description: 'Category of the quiz',
        example: 'Sport',
    })
    @IsString()
    @IsNotEmpty()
    readonly category : string;

    @ApiProperty({
        name: 'questions',
        description: 'List of the questions',
        type: [QuestionDto],
    })
    @IsInstance(QuestionDto, { each: true })
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    readonly questions : QuestionDto[]
}