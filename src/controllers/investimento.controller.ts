import { Request, Response, NextFunction } from 'express';
import InvestimentosService from '../services/investimentos.service';

const investimentosService = new InvestimentosService();

/* class InvestimentosController {
  constructor(private investimentosService = new InvestimentosService()) {}

  public venderAtivo = async (req: Request, res: Response, next: NextFunction) => {
    const { id_ativo, id_cliente, qtde } = req.body;
    const { statusCode, data, message } = await this.investimentosService
      .venderAtivo(id_ativo, id_cliente, qtde);

    if (message) {
      return next({
        statusCode,
        message,
      });
    }
    return res.status(statusCode).json(data);
  };
}

export default InvestimentosController; */

const venderAtivo = async (req: Request, res: Response, next: NextFunction) => {
  const { id_ativo, id_cliente, qtde } = req.body;
  const { statusCode, data, message } = await investimentosService
    .venderAtivo(id_ativo, id_cliente, qtde);

  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

export default { venderAtivo };
