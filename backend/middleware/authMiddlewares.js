import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../database-config/database-config.js';

dotenv.config();

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { uid } = decoded;

    const user = await db.collection('users').doc(uid).get();

    if (!user.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = { uid };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      console.error('JWT verification failed:', error);
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }
};

export default authMiddleware;
