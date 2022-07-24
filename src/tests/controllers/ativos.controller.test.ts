import { Request, Response, NextFunction } from 'express';
import ativosController from '../../controllers/ativos.controller';
import { ID, ID_INVALID } from '../mocks';

describe.skip('Testa o controller dos ativos', () => {
  describe('Função getAll', () => {
    it('Retorna status 200 e um json', async () => {
      const mReq = {
        query: {},
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await ativosController
        .getAll(mReq as unknown as Request, mRes as unknown as Response, mNext as NextFunction);
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalled();
    });
  });

  describe('Função getById', () => {
    it('Retorna status 200 e um json quando busca um id válido', async () => {
      const mReq = {
        query: {},
        params: { id: ID },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();
    
      await ativosController
        .getById(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
          
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalled();
    });
    it('Se envia um id inválido retorna status 404 e uma message', async () => {
      const mReq = {
        query: {},
        params: { id: ID_INVALID },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();
    
      await ativosController
        .getById(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
      
      expect(mNext).toBeCalled();
    });
  });

  describe('Função getByIdCliente', () => {
    it('Se o cliente contém ativos retorna status 200 e uma lista dos investimentos', async () => {
      const mReq = {
        query: {},
        params: { id: ID },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();
        
      await ativosController
        .getByIdCliente(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
              
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.json).toBeCalled();
    });
    it('Se o cliente não tem ativos retorna um status 204 e no content', async () => {
      const mReq = {
        query: {},
        params: { id: ID_INVALID },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mNext = jest.fn();

      await ativosController
        .getByIdCliente(
          mReq as unknown as Request, 
          mRes as unknown as Response,
          mNext as NextFunction,
        );
      expect(mRes.status).toBeCalledWith(204);
    });
  });
});