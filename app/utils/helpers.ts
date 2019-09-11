import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer.');
  }

  return await bcrypt.hash(password, 10);
};

export const getFirstName = (fullName: string): string => {
  return fullName.split(' ')[0];
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && !password.toLowerCase().includes('password');
};
