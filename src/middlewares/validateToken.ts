import { NextFunction, Request, Response } from 'express';
import { HttpException } from './middleError';
import { authenticateToken } from '../utils/jwt';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  // O 401 diz que é não autorizado;
  if (!token) throw new HttpException(401, 'token não encontrado ou inválido');

  try {
    const cliente = await authenticateToken(token!);
    // Aqui eu não dou throw porque ele ocorre lá no authenticate;
    res.locals.user = cliente;

    next();
  } catch (err) {
    throw new HttpException(401, 'Token expirado ou inválido.');
  }
};
