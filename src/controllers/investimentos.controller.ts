import { Request, Response, NextFunction } from 'express';
import InvestimentosService from '../services/investimentos.service';

const investimentosService = new InvestimentosService();

const venderAtivo = async (req: Request, res: Response, next: NextFunction) => {
  const { codAtivo, codCliente, qtde } = req.body;
  const { statusCode, data, message } = await investimentosService
    .venderAtivo(codAtivo, codCliente, qtde);

  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

const comprarAtivo = async (req: Request, res: Response, next: NextFunction) => {
  const { codAtivo, codCliente, qtde } = req.body;
  const { statusCode, data, message } = await investimentosService
    .comprarAtivo(codAtivo, codCliente, qtde);

  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

const listaInvestimentos = async (req: Request, res: Response, next: NextFunction) => {
  const { statusCode, data, message } = await investimentosService.listaInvestimentos();
  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

export default { venderAtivo, comprarAtivo, listaInvestimentos };
