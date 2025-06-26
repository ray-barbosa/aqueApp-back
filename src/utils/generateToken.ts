import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) : any  => {
    const secret = process.env.JWT_SECRET;
    

    if (!secret) {
        throw new Error("JWT_SECRET não definido nas variáveis de ambiente.");
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";


    return jwt.sign(
        { id: userId },
        secret,
         { expiresIn: "7d"  },
    );
};