import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.token as string;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = user;
      } else {
        return res.status(401).json('You are not authenticated!');
      }
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
      });
    }
  },
};

export default auth;
