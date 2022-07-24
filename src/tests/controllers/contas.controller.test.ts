import { NextFunction, Request, Response } from 'express';
import contasController from '../../controllers/contas.controller';
import { HttpException } from '../../middlewares/middleError';

import {
  contasMock, ID, ID_INVALID, NEW_CLIENTE, NOT_CLIENTE, SALDO, SUPER_SALDO, 
} from '../mocks';

// Usei esse conteúdo para testar o controller:
// https://stackoverflow.com/questions/59235639/how-to-mock-response-from-service-for-testing-controller-in-typescript-using-jes

/* jest.mock('../../services/contas.service', () => {
  const serviceMock = {
    getAll: jest.fn(),
    getById: jest.fn(),
    atualizarConta: jest.fn(),
    createConta: jest.fn(),
    loginConta: jest.fn(),
  };
  return { contasService: jest.fn(() => serviceMock) };
}); */

describe.skip('Testa o controller das contas', () => {
  /* afterEach(() => {
    jest.resetAllMocks();
  }); */

  describe('Método getAll', () => {
    it('Retorna status 200 e um json no response', async () => {
      const mReq = {
        query: {},
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mNext = jest.fn();
      await contasController
        .getAll(mReq as unknown as Request, mRes as unknown as Response, mNext as NextFunction);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalled();
    });
  });

  describe('Método getById', () => {
    it('Se envia um id válido retorna status 200 e um json no response', async () => {
      const mReq = {
        query: {},
        params: { id: ID },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = () => {};

      await contasController
        .getById(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
      
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalled();
    });
    it('Se envia um id inválido retorna status 404 e uma message de erro', async () => {
      const mReq = {
        query: {},
        params: { id: ID_INVALID },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await contasController
        .getById(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
      
      expect(mNext).toBeCalled();
    });
  });

  describe('Método atualizarConta', () => {
    it('Se envia id e saldo válidos retorna status 200 e um json - saque', async () => {
      const mReq = {
        url: '/depositar',
        body: { ...contasMock[0], saldo: SALDO },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await contasController
        .atualizarConta(
          mReq as unknown as Request, 
          mRes as unknown as Response,
        );
      
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalled();
    });

    it('Se envia um id inválido retorna status 404 e uma message', async () => {
      const mReq = {
        url: '/depositar',
        body: { codCliente: ID_INVALID, saldo: SALDO },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await expect(contasController
        .atualizarConta(
          mReq as unknown as Request, 
          mRes as unknown as Response,
        )).rejects.toEqual(
        new HttpException(404, 'Cliente não encontrado'),
      );
    });
    it('Se tenta sacar uma quantidade maior que a da conta lança um erro', async () => {
      const mReq = {
        url: '/depositar',
        body: { codCliente: ID, saldo: SUPER_SALDO },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await expect(contasController
        .atualizarConta(
          mReq as unknown as Request, 
          mRes as unknown as Response,
        )).rejects.toThrowError();
    });
  });

  describe('Método createConta', () => {
    it('Se cria a conta com sucesso retorna status 201 e um json com a chave token', async () => {
      const mReq = {
        body: NEW_CLIENTE,
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await contasController
        .createConta(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
      
      expect(mRes.status).toBeCalledWith(201);
      expect(mRes.json.mock.lastCall[0].token).toBeDefined();
      expect(mNext).not.toBeCalled();
    });
    it('Se não cria a conta, lança um erro', async () => {
      const mReq = {
        body: NEW_CLIENTE,
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await expect(contasController
        .createConta(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        )).rejects.toThrowError();
    });
  });
  describe('Método loginConta', () => {
    it('Se faz login de cadastro existente retorna status 200 e um json com a chave token', async () => {
      const mReq = {
        body: NEW_CLIENTE,
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await contasController
        .loginConta(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
      
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json.mock.lastCall[0].token).toBeDefined();
      expect(mNext).not.toBeCalled();
    });
  });
  it('Se tenta logar com usuário inexistente lança um erro', async () => {
    const mReq = {
      body: NOT_CLIENTE,
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mNext = jest.fn();

    await expect(contasController
      .loginConta(
        mReq as unknown as Request, 
        mRes as unknown as Response,
        mNext as NextFunction,
      )).rejects.toThrowError();
  });
});