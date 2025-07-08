import { Router } from "express";
import { updateProfile } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";


const router = Router();

router.put("/profile", verifyToken, updateProfile);

export default router;