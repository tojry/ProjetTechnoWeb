import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret._id;
        },
    },
    versionKey: false,
})
export class User {
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    id: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ nom: 1}, { unique: true });
