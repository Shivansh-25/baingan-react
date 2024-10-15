import jwt from 'jsonwebtoken';
import redisClient from '../database-config/redis-client.js';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  // Extract token from header (Assuming format: "Bearer <token>")
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing from Authorization header' });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = decoded.uid;

    // Check if token exists in Redis
    const cachedToken = await redisClient.get(uid);

    if (!cachedToken || cachedToken !== token) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request object for further use
    req.user = { uid };

    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
