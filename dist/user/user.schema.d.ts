import mongoose, { Document } from 'mongoose';
export type UsersDocument = User & Document;
export declare class User {
    username: string;
    password: string;
    _id: mongoose.Types.ObjectId | string;
}
export declare const UserSchema: any;
