"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não definido nas variáveis de ambiente.");
    }
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
    return jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
