import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export default function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}


