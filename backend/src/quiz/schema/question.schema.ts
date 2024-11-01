import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// ça servira pour quand il y aura les questions
export type QuestionDocument = Question & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class Question {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    intitule: string;

    @Prop({
        type: [
            {
                texte: { type: String, required: true, trim: true },
                correct: { type: Boolean, required: true }
            }
        ],
        validate: [
            (val: Array<any>) => val.filter((res) => res.correct).length === 1,
            'Une seule réponse doit être correcte'
        ],
        required: true,
    })
    reponses: {
        texte: string;
        correct: boolean;
    }[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

// Index pour éviter des doublons d'intitulés
QuestionSchema.index({ intitule: 1 }, { unique: true });