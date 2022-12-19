interface ICredentials {
  email: string;
  password: string;
}

export function validateProps(credentials: ICredentials) {
  const cred = ['email', 'password'];

  if (cred.every((el) => el in credentials)) {
    return { type: null, message: 'ok' };
  }
  return { type: 'error', message: 'Incorrect email or password' };
}

export function validatePropsValue(credentials: ICredentials) {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  if (credentials.password.length < 6) {
    return { type: 'error', message: 'All fields must be filled' };
  }

  if (!emailRegex.test(credentials.email)) {
    return { type: 'error', message: 'All fields must be filled' };
  }

  return { type: null, message: '' };
}
