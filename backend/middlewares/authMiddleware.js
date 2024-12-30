import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Attach user ID to the request
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
