import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export { generateAccessToken, generateRefreshToken };
