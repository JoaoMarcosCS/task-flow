/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as bcrypt from 'bcrypt';

export const comparePassword = async (password, hash): Promise<boolean> => {
  const isCorrect = await bcrypt.compare(password, hash);

  return isCorrect;
};
