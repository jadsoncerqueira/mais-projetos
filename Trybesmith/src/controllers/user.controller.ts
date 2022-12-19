import { Request, Response } from 'express';
import statusCodes from '../../statusCodes';
import UserService from '../services/user.service';
import { createToken } from '../utils/jwt';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const response = await this.userService.create(req.body);
    if (response.type) {
      return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ message: response.message });
    }
    const token = createToken(req.body);
    return res.status(statusCodes.CREATED).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const credens = ['username', 'password'];
    let creden = '';

    const validationCredens = credens.every((el) => {
      if (!(el in req.body)) {
        creden = el;
      }
      return el in req.body;
    });
    
    if (!validationCredens) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: `"${creden}" is required` });
    }
    
    const response = await this.userService.login(req.body);
    if (response.length > 0) {
      const { id } = response[0];
      const token = createToken({ id, username: req.body.username });
      return res.status(statusCodes.OK).json({ token });
    }
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
  };
}

export default UserController;