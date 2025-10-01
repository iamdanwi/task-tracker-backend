import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ valid: false, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId.id };
    next();
  } catch (error) {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};

export default verifyToken;
