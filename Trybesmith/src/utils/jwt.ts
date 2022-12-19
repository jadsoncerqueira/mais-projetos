import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../interfaces/user.interface';
import Res from '../interfaces/types.interface';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const createToken = (pay: User): string => {
  const token = jwt.sign({ pay }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export const validateToken = (token: string): Res => {
  try {
    const { pay } = jwt.verify(token, secret) as JwtPayload;
    return { type: null, message: pay };
  } catch (error) {
    const e = new Error('Invalid token');
    e.name = 'Invalid Token';
    return { type: 'error', message: e.message };
  }
};