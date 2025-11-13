import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. Hash Password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// 2. Compare Password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// 3. Generate Token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
