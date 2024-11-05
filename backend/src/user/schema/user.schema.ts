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
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    })
    _id: any;

    @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true
    })
    username: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
