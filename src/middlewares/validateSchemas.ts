import { Request, Response, NextFunction } from 'express';
import { HttpException } from './middleError';
import { schemaCliente, schemaInvestimentos, schemaCreateCliente } from './schemas';

// Tornar dinâmico

/* const validateSchemas = (req: Request, res: Response, next: NextFunction, schema: ) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    // Escolhi o 406 para dizer que é inaceitável esses dados.
    // O 400 é um bad request porque está vazio.
    const statusCode = type === 'any.required' ? 400 : 406;
    throw new HttpException(statusCode, message);
  }
  next();
}; */

const validateInvestimentos = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemaInvestimentos.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    // Escolhi o 406 para dizer que é inaceitável esses dados.
    // O 400 é um bad request porque está vazio.
    const statusCode = type === 'any.required' ? 400 : 406;
    throw new HttpException(statusCode, message);
  }
  next();
};

const validateCliente = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schemaCliente.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    const statusCode = type === 'any.required' ? 400 : 406;
    throw new HttpException(statusCode, message);
  }
  next();
};

const validateAtivos = (req: Request, _res: Response, next: NextFunction) => {
  // Para quando eu criar a rota de criar ativo -> post;
  next();
};

const validateCriarConta = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schemaCreateCliente.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    const statusCode = type === 'any.required' ? 400 : 406;
    throw new HttpException(statusCode, message);
  }
  next();
};

export {
  validateInvestimentos, validateAtivos, validateCliente, validateCriarConta,
};