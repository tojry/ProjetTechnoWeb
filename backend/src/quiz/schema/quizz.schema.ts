import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuizzDocument = Quizz & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
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
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    })
    category: string;

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
        default: []
    })
    questions: mongoose.Types.ObjectId[];

}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);

QuizzSchema.index({ nom: 1}, { unique: true });
