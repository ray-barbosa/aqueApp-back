import mongoose, {Document, Schema } from "mongoose";


export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    pronouns?: string;
    userType: "professional | client";
    serviceTitle?: string;
    category?: string;
    description?: string;
    imageUrl?: string;
    contactInfo?: {
        whatsapp?: string;
        instagram?: string;
        tiktok?: string;
        contactEmail?: string;
    }
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
        serviceTitle: { type: String },
        category: { type: String },
        description: { type: String },
        imageUrl: { type: String },
        contactInfo: {
            whatsapp: { type: String },
            instagram: { type: String },
            tiktok: { type: String },
            contactEmail: { type: String },
        }
    },
    { timestamps: true}
);


const User = mongoose.model<IUser>("User", UserSchema);


export default User;