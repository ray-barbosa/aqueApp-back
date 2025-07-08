"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, pronouns, userType, serviceTitle, category, description, imageUrl, contactInfo } = req.body;
        //basic validation
        if (!name || !email || !password || !userType) {
            return res.status(400).json({ message: "Missing required fields. " });
        }
        if (userType === "professional") {
            if (!serviceTitle || !category || !description) {
                return res.status(400).json({ message: "Missing required fields for professional user." });
            }
        } //verify if email already exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "Email alreadys in use. " });
        }
        //crypt pass
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        //create an user on db
        const newUser = new User_1.default({
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
        yield newUser.save();
        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            userType: newUser.userType,
            pronouns: newUser.pronouns,
        };
        // return sucess response (without pass!)
        if (newUser.userType === "client") {
            return res.status(201).json({
                userResponse,
                message: "User registered successfully as a client."
            });
        }
        else if (newUser.userType === "professional") {
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
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error: " });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        // Find user by email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Verify password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        // Generate token
        const token = (0, generateToken_1.generateToken)(user._id);
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
});
exports.loginUser = loginUser;
