import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

import * as Jwt from 'jsonwebtoken';

export interface Payload {
  username: string | undefined;
  role: string | undefined;
  email: string | undefined;
  message?: string;
}

interface Response {
  type: null | string;
  message: JwtPayload | Payload
}

const GerencyToken = {
  generate(pay : Payload): string {
    let token = '';
    if (process.env.JWT_SECRET) {
      const tokenG = Jwt.sign({ pay }, process.env.JWT_SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });
      token = tokenG;
    }
    return token;
  },
  validate(token: string): Response {
    const e1 = new Error('Variavel não usada');
    try {
      let response: Response = { type: '', message: e1 };
      if (process.env.JWT_SECRET) {
        const { pay } = Jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        response = { type: null, message: pay };
      }
      return response;
    } catch (error) {
      const e = new Error('Token must be a valid token');
      return { type: 'Error', message: e };
    }
  },
};

export default GerencyToken;
