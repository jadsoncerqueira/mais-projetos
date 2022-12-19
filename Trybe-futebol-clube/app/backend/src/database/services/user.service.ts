import UserModel from '../models/user.model';
import Password from '../../utils/Password';
import GerencyToken, { Payload } from '../../utils/jwt';

export interface IToken {
  type: string | null;
  message: string;
}

export default class UserService {
  userModel = UserModel;
  async login(email: string, password: string): Promise<IToken> {
    const crypPass = Password;
    const conta = await this.userModel.findOne({ where: { email } });

    const pass = conta && crypPass.compare(password, conta.dataValues.password);

    if (pass) {
      const pay: Payload = {
        username: conta.dataValues.username,
        role: conta.dataValues.role,
        email: conta.dataValues.email,
      };
      return { type: null, message: GerencyToken.generate(pay) };
    }
    return { type: 'error', message: 'Incorrect email or password' };
  }
}
