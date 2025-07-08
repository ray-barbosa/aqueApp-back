import { Request, Response } from "express";
import User from "../models/User";


export const updateProfile = async (req: Request, res: Response) : Promise<any> => {

    try{
        const userID = req.user?.id;

        if(!userID){
            return res.status(401).json({message: "Unauthorized"});
        }

        const updates = req.body;

        const allowedFields = ["name", "pronouns", "serviceTitle", "category", "description", "imageUrl", "contactInfo"];

        const sanitizedUpdates: Record<string, any> = {};
        for (const field of allowedFields) {
            if(updates[field] !== undefined) {
                sanitizedUpdates[field] = updates[field];
            }
    }

    const updateUser = await User.findByIdAndUpdate(
        userID,
        { $set: sanitizedUpdates },
        { new: true }
    ).select("-password");

    return res.status(200).json({
        message: "Profile updated successfully",
        user: updateUser
    });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};