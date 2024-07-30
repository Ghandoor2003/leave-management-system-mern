import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (!req.user) return res.status(401).json({ message: 'User not found' });

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

export default authMiddleware;
