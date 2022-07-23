import { Request, Response } from 'express';
import contasController from '../../controllers/contas.controller';
import contasService from '../../services/contas.service';

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

describe('Testa o controller das contas', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Método getAll', () => {
    it('Retorna status 200 e um json no response', async () => {
      const mReq = {
        query: {},
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await contasController
        .getAll(mReq as Request, mRes as unknown as Response);
      expect(mRes.status).toBeCalledWith(200);
      console.log(mRes.status);
      expect(mRes.json).toBeCalled();
    });
  });

  describe('Método getById', () => {
    it('Se envia um id válido retorna status 200 e um json no response', async () => {});
    it('Se envia um id inválido retorna status 404 e uma message de erro', () => {});
  });

  describe('Método atualizarConta', () => {
    it('Se envia id e saldo válidos retorna status 200 e um json', () => {});
    it('Se envia um id inválido retorna status 404 e uma message', () => {

    });
    it('Se tenta sacar uma quantidade maior que a da conta lança um erro', () => {});
  });

  describe('Método createConta', () => {
    it('Se cria a conta com sucesso retorna status 201 e um json com a chave token', () => {});
  });
  describe('Método loginConta', () => {
    it('Se faz login de cadastro existente retorna status 200 e um json com a chave token', () => {});
    it('Se tenta logar com usuário inexistente lança um erro', () => {});
  });
});