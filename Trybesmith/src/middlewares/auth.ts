import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/jwt';
import statusCodes from '../../statusCodes';

const TokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  const data = validateToken(authorization);

  if (data.type) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: data.message });
  }
  req.body.user = data.message;
  next();
};

export default TokenValidate;