import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../entity/login.entity';

export const passwordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

export const generateToken = async (user: Users) => {
  // jwt token provision
  const payload = { nik: user.nik, name: user.name };
  const token = jwt.sign(payload, 'Random String', { expiresIn: '1h' });
  return token;
};
