import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';

export type QuizzDocument = Quizz & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
    autoIndex : true
})
export class Quizz {

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
    author: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    title: string;

    @Prop({
        type: Number,
        required: true
    })
    category: number;

    @Prop({
        type: [QuestionSchema],
        required: true,
        validate: {
            validator: (v: Question[]) => v.length > 0,
            message: 'The quiz must have at least one question.',
        },
    })
    questions: Question[];

}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);
QuizzSchema.index({ title: 'text'});
