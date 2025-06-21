import { MongoServerClosedError } from "mongodb";
import mongoose, {Document, Schema } from "mongoose";


export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    pronouns?: string;
    userType: "professional | client";
    createdAt: Date;
    upddatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        userType: {
            type: String,
            enum: ["professional", "client"],
            required: true,
        }, 
    },
    { timestamps: true}
);


const User = mongoose.model<IUser>("User", UserSchema);


export default User;