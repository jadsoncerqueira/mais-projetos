import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

const Password = {
  crypt(text: string, rounds: number): string {
    const lv = genSaltSync(rounds);
    const passwordCrypt = hashSync(text, lv);
    return passwordCrypt;
  },

  compare(text: string, hash: string): boolean {
    return compareSync(text, hash);
  },
};

export default Password;
