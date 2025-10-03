import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any; // You might want to define a more specific user type
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey', (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Token no longer valid
    req.user = user;
    next();
  });
};

