import { NextFunction, Request, Response } from 'express';
import { HttpException } from './middleError';
import { authenticateToken } from '../utils/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const cliente = await authenticateToken(token);

  if (!cliente) throw new HttpException(401, 'Token inválido');

  res.locals.user = cliente;
  next();
};
