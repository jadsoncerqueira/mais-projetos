import { Request, Response } from 'express';
import UserService from '../services';
import { validateProps, validatePropsValue } from '../../utils/validations/loginProps';
import GerencyToken from '../../utils/jwt';

const UserController = {
  async login(req: Request, res: Response) {
    const valProps = validateProps(req.body);

    if (valProps.type) return res.status(400).json({ message: valProps.message });

    const valValues = validatePropsValue(req.body);

    if (valValues.type) return res.status(400).json({ message: valValues.message });

    const { email, password } = req.body;
    const userService = new UserService();
    const response = await userService.login(email, password);

    if (response.type) return res.status(401).json({ message: response.message });
    return res.status(200).json({ token: response.message });
  },

  validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const response = GerencyToken.validate(authorization);
      if (response.type) return res.status(400).json({ message: 'falha ao carregar usuario' });
      return res.status(200).json({ role: response.message.role });
    }
    return res.status(404).json({ message: 'token não encontrado' });
  },
};

export default UserController;
