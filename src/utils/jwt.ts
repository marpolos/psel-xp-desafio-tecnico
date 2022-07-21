import dotenv from 'dotenv';
import {
  JwtPayload, sign, verify, SignOptions,
} from 'jsonwebtoken';
import ICliente from '../interfaces/ICliente';
import { HttpException } from '../middlewares/middleError';

dotenv.config();
const { JWT_SECRET } = process.env;

// Configurações padrãoes para o JWT
const jwtConfig: SignOptions = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const generateToken = (cliente: Omit<ICliente, 'codCliente'>) => sign({ cliente }, JWT_SECRET!, jwtConfig);

const authenticateToken = async (token: string): Promise<string | JwtPayload> => {
  const validate = await verify(token, JWT_SECRET!);
  // Aqui ele verifica a senhasupersecreta e o tempo.
  if (!validate) throw new HttpException(401, 'Token inválido');

  return validate;
};

export { generateToken, authenticateToken };
