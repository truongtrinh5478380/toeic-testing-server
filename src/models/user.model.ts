import { Schema, model, Document } from "mongoose"

export type UserDocument = Document & {
    username: string
    password: string
    fullname: string
    email: string
    gender: Gender
    phone_number: string
    role: Roles
}

enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum Roles {
    Teacher = 'teacher',
    User = 'user'
}

const UserModelSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    fullname: {
        type: String,
        default: 'Toeic Test Member'
    },

    gender: {
        type: String,
        enum: Gender,
    },

    phoneNumber: {
        type: String
    },

    email: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: Roles.User
    }
});

// Compile model from schema
export const UserModel = model<UserDocument>('Users', UserModelSchema);