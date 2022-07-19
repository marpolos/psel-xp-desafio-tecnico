import { Request, Response, NextFunction } from 'express';
import ContaService from '../services/conta.service';

/* class ContaController {
  constructor(public _contaService = new ContaService()) {}

  public async getAll(_req: Request, res: Response) {
    console.log('service', this._contaService);
    console.log('entrei aqui');
    const teste = new ContaService();
    console.log('teste', teste);
    const data = await this._contaService.getAll();
    return res.status(200).json(data);
  }
}

// Aqui vou exportar instanciada para título de estudo.

export default new ContaController(); */

const getAll = async (req: Request, res: Response) => {
  const { statusCode, data } = await ContaService.getAll();
  return res.status(statusCode).json(data);
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { statusCode, data, message } = await ContaService.getById(Number(id));
  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

const atualizarConta = async (req: Request, res: Response, next: NextFunction) => {
  const type: null | string = req.url === '/saque' ? null : 'deposito';
  const { id, saldo } = req.body;

  const { statusCode, data, message } = await ContaService
    .atualizarConta(Number(id), Number(saldo), type);
  if (message) {
    return next({
      statusCode,
      message,
    });
  }
  return res.status(statusCode).json(data);
};

const createConta = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  const { statusCode, data, message } = await ContaService.createConta(req.body);

  if (message) {
    return next({
      statusCode,
      message,
    });
  }

  return res.status(statusCode).json({ token: data });
};

export default {
  getAll, getById, atualizarConta, createConta,
};