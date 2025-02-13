'use server';

import bcrypt from 'bcrypt';

export const verifyPassword = async (password: string): Promise<boolean> => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PWD, 10);
  if (!hashedPassword) throw new Error('No password set');

  return bcrypt.compare(password, hashedPassword);
};