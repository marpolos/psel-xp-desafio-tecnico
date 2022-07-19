import { NextFunction, Request, Response } from 'express';
import { HttpException } from './middleError';
import { authenticateToken } from '../utils/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  // O 401 diz que é não autorizado;
  if (!token) { 
    next({
      statusCode: 401, 
      message: 'token não encontrado ou inválido',
    });
  }
  try {
    const cliente = await authenticateToken(token!);
    if (!cliente) throw new HttpException(401, 'Token inválido');  
    res.locals.user = cliente;
    next();
  } catch (err) {
    next({
      statusCode: 401,
      message: 'Token expirado ou inválido.',
    });
  }
};
