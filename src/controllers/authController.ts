import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";



export const registerUser = async (req: Request, res: Response) : Promise<any>  => {

    try{

        const { name, email, password, pronouns, userType, serviceTitle, category, description, imageUrl, contactInfo } = req.body;


        //basic validation
        if(!name || !email || !password || !userType ){
            return res.status(400).json({ message: "Missing required fields. "});
        }
        if(userType === "professional"){
            
            if(!serviceTitle || !category || !description) {

                return res.status(400).json({ message: "Missing required fields for professional user." });
            }
        }      //verify if email already exists
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(409).json({ message: "Email alreadys in use. "})

        }
        //crypt pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create an user on db
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            pronouns,
            userType,
            serviceTitle,
            category,
            description,
            imageUrl,
            contactInfo
        });

        await newUser.save();

        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            userType: newUser.userType,
            pronouns: newUser.pronouns,
        }

        // return sucess response (without pass!)
        if (newUser.userType === "client" as typeof newUser.userType) {
            return res.status(201).json({
            userResponse,
            message: "User registered successfully as a client."
            });

        } else if (newUser.userType === "professional") {
            return res.status(201).json({
            userResponse,
            serviceTitle: newUser.serviceTitle,
            category: newUser.category,
            description: newUser.description,
            imageUrl: newUser.imageUrl,
            contactInfo: newUser.contactInfo,
            message: "User registered successfully as a professional."
            });
        }
    } catch (error) {
        console.error("Error registering user:" , error);
        return res.status(500).json({message:"Internal server error: "})
    }
};

export const loginUser = async (req: Request, res: Response) : Promise<any>  => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate token
        const token = generateToken(user._id as string);

        // Return success response
        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
            },
            token,
        });


    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
