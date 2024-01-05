import { Request, Response, NextFunction } from 'express';

const JWT_TOKEN: string = process.env.JWT_TOKEN || '';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies[JWT_TOKEN]) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  next();
};
