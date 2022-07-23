import { Request, Response, NextFunction } from 'express';
import AtivosService from '../services/ativos.service';

const ativosService = new AtivosService();

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  const { statusCode, data, message } = await ativosService.getAll();
  
  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  
  return res.status(statusCode).json(data);
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { statusCode, data, message } = await ativosService.getById(Number(id));
  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

const getByIdCliente = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { statusCode, data, message } = await ativosService.getByIdCliente(Number(id));
  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

export default { getAll, getById, getByIdCliente };
