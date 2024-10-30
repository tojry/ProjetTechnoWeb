export interface Quiz {
    id? : string;
    author: string;
    title : string;
    questions: Question[];
}

export interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}