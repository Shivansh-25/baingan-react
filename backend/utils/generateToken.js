import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = (user) => {
  
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export default generateJWT;
