"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const autHeader = req.headers.authorization;
    const secret = process.env.JWT_SECRET;
    if (!autHeader || !autHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = autHeader.split(" ")[1];
    if (!secret) {
        res.status(500).json({ message: "JWT secret not configured" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        next();
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
};
exports.verifyToken = verifyToken;
