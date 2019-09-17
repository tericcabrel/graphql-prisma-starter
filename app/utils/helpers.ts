import bcrypt from 'bcryptjs';
import { Timestamp } from '../types/common';

export const hashPassword = async (password: string): Promise<string> => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.');
  }

  return await bcrypt.hash(password, 10);
};

export const timestamp = (): Timestamp => {
  const date = new Date();
  return {
    created_at: date,
    updated_at: date,
  };
};
