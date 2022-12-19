import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import ValidateUsers from '../utils/validations/usersvalidate';
import Res from '../interfaces/types.interface';

class UserService {
  public model: UserModel;
  
  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<Res> {
    const val = ValidateUsers(user);
    if (val) return { type: 'error', message: val };
    await this.model.create(user);
    return { type: null, message: '' };
  }

  public async login(user: User): Promise<User[]> {
    const response = await this.model.login(user);
    return response;
  }
}

export default UserService;