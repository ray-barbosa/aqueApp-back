import {  RequestHandler } from "express";
import jwt from "jsonwebtoken";


export const verifyToken: RequestHandler = ( req, res, next) => {
   const autHeader = req.headers.authorization;
   const secret = process.env.JWT_SECRET

    if(!autHeader || !autHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = autHeader.split(" ")[1];

    if(!secret) {
        res.status(500).json({ message: "JWT secret not configured" });
        return;
    }

    try{
        const decoded = jwt.verify(token, secret) as { id: string };

        req.user = { id: decoded.id }; 
        next();
    } catch (error) {
        next();
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
}
