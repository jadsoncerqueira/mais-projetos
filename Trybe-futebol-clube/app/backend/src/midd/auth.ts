import { NextFunction, Request, Response } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
import GerencyToken from '../utils/jwt';

// export interface Payload {
//   username: string | undefined;
//   role: string | undefined;
//   email: string | undefined;
// }

// interface Respo {
//   type: null | string;
//   message: JwtPayload | Payload
// }

const Auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  let result;
  if (authorization) {
    result = GerencyToken.validate(authorization);

    if (result.type) {
      res.status(401).json({ message: result.message.message });
    } else {
      next();
    }
  }
};

export default Auth;
