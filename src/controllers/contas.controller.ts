import { Request, Response, NextFunction } from 'express';
import { AtualizarConta } from '../interfaces/typeAtualizarConta';
import ContaService from '../services/contas.service';

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

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  const { statusCode, data, message } = await ContaService.getAll();
  
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
  const type: AtualizarConta = req.url === '/saque' ? 'sacar' : 'depositar';
  const { codCliente, saldo } = req.body;

  // Todos os possíveis erros são lançado na model porque envolvem o banco.
  const { statusCode, data } = await ContaService
    .atualizarConta(Number(codCliente), Number(saldo), type);
  
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

const loginConta = async (req: Request, res: Response, next: NextFunction):
Promise<Response | void> => {
  const { statusCode, data, message } = await ContaService.loginConta(req.body);

  if (message) {
    return next({
      statusCode,
      message,
    });
  }

  return res.status(statusCode).json({ token: data });
};

export default {
  getAll, getById, atualizarConta, createConta, loginConta,
};