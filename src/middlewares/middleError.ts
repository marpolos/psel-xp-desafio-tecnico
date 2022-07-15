import { NextFunction, Request, Response } from 'express';
// Criar esse arquivo no futuro com enum: import { HttpStatus } from '../enums/httpStatus.enum';

export class HttpException extends Error {
    public status: number;
    
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}
export default (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
  next();
}