export type Quizz = {
    id: string;
    nom: string;
    categorie: string;
    questions : Question[];
};

export type Question = {
    texte: string;
    correcte: boolean;
};