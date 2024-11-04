export interface Quiz {
    id? : string;
    author: string;
    title : string;
    category: number;
    questions: Question[];
}

export interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}

export const Category = {
    0: {name: 'Non renseignée', color: '--gray-500'},
    1: {name: 'Géographie', color: '--blue-400'},
    2: {name: 'Histoire', color: '--orange-500'},
    3: {name: 'Musique', color: '--indigo-400'},
    4: {name: 'Sport', color: '--red-300'},
    5: {name: 'Sciences', color: '--green-500'}
} as const;
  
export type Category = typeof Category[keyof typeof Category];
