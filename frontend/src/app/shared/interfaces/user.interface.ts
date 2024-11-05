import { Quiz } from "./quiz.interface";

export interface User {
    username : string;
    createdQuizs : Quiz[];
}