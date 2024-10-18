import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../database-config/database-config.js';

dotenv.config();

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  // Check if authorization header exists and follows the format "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication token missing or improperly formatted' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { uid } = decoded;

    // Fetch user from the database using uid
    const user = await db.collection('users').doc(uid).get();

    if (!user.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach user information to request object
    req.user = { uid };
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token', code: 'INVALID_TOKEN' });
    } else {
      console.error('JWT verification failed:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }
};

export default authMiddleware;
