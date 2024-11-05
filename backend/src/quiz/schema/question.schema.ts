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
            return ret;
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
    question: string;

    @Prop({
        type: [String],
        required: true,
        trim: true,
        validate: {
            validator: (v: string[]) => v.length === 3,
            message: 'Each question must have exactly 3 answers.',
        },
    })
    answers: string[];

    @Prop({
        type: Number,
        required: true,
        min: 0,
        max: 2
    })
    correctAnswer: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
