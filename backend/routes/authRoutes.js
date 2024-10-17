import express from "express";
import {
    signup,
    login,
    googleLogin,
    googleCallback,
    logout,
    refreshToken,
    sendVerificationEmail,
    verifyOtp,
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddlewares.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/google", googleLogin);

router.get("/google/callback", googleCallback);

router.get("/logout", logout);

router.get("/refreshToken", refreshToken);

router.post("/verifyEmail", sendVerificationEmail);

router.post("/verifyotp", verifyOtp);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Protected route" });
});

export default router;
