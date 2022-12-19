import { users } from './schema';
import User from '../../interfaces/user.interface';

const ValidateUsers = (obj: User): string | null => {
  const { error } = users.validate(obj);
  if (error) return error.message;
  return null;
};

export default ValidateUsers;