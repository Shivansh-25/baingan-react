import express from "express";
import { signup, login, googleLogin, googleCallback } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddlewares.js";

const router = express.Router();

console.log('router');

router.post('/signup', signup);

router.post('/login', login);

router.get('/google', googleLogin);

router.get('/google/callback', googleCallback);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Protected route' });
    }
);

export default router;
