import { NextFunction, Request, Response } from 'express';
// Criar esse arquivo no futuro com enum: import { HttpStatus } from '../enums/httpStatus.enum';

export class HttpException extends Error {
  public statusCode: number;
    
  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }
}
export default (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err as HttpException;
  res.status(statusCode || 500).json({ message });
  next();
};