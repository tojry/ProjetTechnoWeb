import { Quiz } from "./quiz.interface";

export interface User {
    id : string;
    createdQuizs : Quiz[];
}