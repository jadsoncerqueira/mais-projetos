import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../statusCodes';

export const ValidatePropsPro = (req: Request, res: Response, next: NextFunction) => {
  const props = ['name', 'amount'];
  const val = props.every((el) => el in req.body);
  if (val) {
    next();
  } else if (!(props[0] in req.body)) {
    res.status(statusCodes.BAD_REQUEST).json({ message: '"name" is required' });
  } else {
    res.status(statusCodes.BAD_REQUEST).json({ message: '"amount" is required' });
  }
};

export const ValidatePropsUsers = (req: Request, res: Response, next: NextFunction) => {
  const props = ['username', 'classe', 'level', 'password'];
  const val = props.every((el) => el in req.body);
  if (val) {
    next();
  } else if (!(props[0] in req.body)) {
    res.status(statusCodes.BAD_REQUEST).json({ message: '"username" is required' });
  } else if (!(props[1] in req.body)) {
    res.status(statusCodes.BAD_REQUEST).json({ message: '"classe" is required' });
  } else if (!(props[2] in req.body)) {
    res.status(statusCodes.BAD_REQUEST).json({ message: '"level" is required' });
  } else {
    res.status(statusCodes.BAD_REQUEST).json({ message: '"password" is required' });
  }
};