import { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    return res.status(401).json('Unauthorized');
  }

  next();
};

export { auth };
