export interface Quiz {
    id? : string;
    author: string;
    title : string;
    category: string;
    questions: Question[];
}

export interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}

export const Category = {
    0: 'Non renseignée',
    1: 'Géographie',
    2: 'Histoire',
    3: 'Musique',
    4: 'Sport',
    5: 'Sciences'
} as const;
  
export type Category = typeof Category[keyof typeof Category];
