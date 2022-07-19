import dotenv from 'dotenv';
import {
  JwtPayload, sign, verify, SignOptions,
} from 'jsonwebtoken';
import { HttpException } from '../middlewares/middleError';
import ICliente from '../interfaces/ICliente';

dotenv.config();
const { JWT_SECRET } = process.env;

// Configurações padrãoes para o JWT
const jwtConfig: SignOptions = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const generateToken = (cliente: Omit<ICliente, 'codCliente'>) => sign({ cliente }, JWT_SECRET!, jwtConfig);

const authenticateToken = async (token: string | undefined): Promise<string | JwtPayload> => {
  // O 401 diz que é não autorizado;
  const message = 'token não encontrado ou inválido';
  if (!token) throw new HttpException(401, message);
  try {
    const validate = await verify(token, JWT_SECRET!);
    return validate;
  } catch {
    throw new HttpException(401, message);
  }
};

export { generateToken, authenticateToken };
