import {Question} from "../schema/question.schema";

export class CreateAndPutQuizzDto {
    readonly nom : string;
    readonly categorie : string;
    readonly questions : Question[]
}