import { HttpException } from '../../middlewares/middleError';
import contasService from '../../services/contas.service';
import {
  DEPOSITAR, ID, ID_INVALID, NEW_CLIENTE, NOT_CLIENTE, SACAR, SALDO, SUPER_SALDO, 
} from '../mocks';

describe.skip('Testa o service das contas', () => {
  describe('Método getAll', () => {
    it('Retorna status 200 e um data de array', async () => {
      const response = await contasService.getAll();

      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Método getById', () => {
    it('Se a conta existe retorna status 200 e um data', async () => {
      const response = await contasService.getById(ID);

      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
    it('Se a conta não existe retorna status 404 e uma message', async () => {
      const response = await contasService.getById(ID_INVALID);

      expect(response).toHaveProperty('statusCode');
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('Método atualizarConta', () => {
    it('Se atualiza com sucesso retorna status 200 e um data - sacar', async () => {
      const response = await contasService.atualizarConta(ID, SALDO, SACAR);
      
      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
    it('Se atualiza com sucesso retorna status 200 e um data - depositar', async () => {
      const response = await contasService.atualizarConta(ID, SALDO, DEPOSITAR);

      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
    it('Se o id não existe retorna um erro', async () => {
      await expect(contasService.atualizarConta(ID_INVALID, SALDO, SACAR)).rejects.toEqual(
        new HttpException(404, 'Cliente não encontrado'),
      );
    });
    it('Se o valor para saque for maior que o na conta lança um erro', async () => {
      await expect(contasService.atualizarConta(ID, SUPER_SALDO, SACAR)).rejects.toEqual(
        new HttpException(400, 'Saldo insuficiente'),
      );
    });
  });

  describe('Método createConta', () => {
    it('Ao criar um usuário com sucesso retorna status 201', async () => {
      const response = await contasService.createConta(NEW_CLIENTE);
      
      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(201);
    });
    it('Ao enviar um usuário que já existe retorna status 409 e message', async () => {
      await expect(contasService.createConta(NEW_CLIENTE))
        .rejects.toThrowError();
    });
  });

  describe('Método loginConta', () => {
    it('Se realiza login com sucesso retorna status 200', async () => {
      const response = await contasService.loginConta(NEW_CLIENTE);

      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
    it('Se há erro no login retorna status 404', async () => {
      await expect(contasService.loginConta(NOT_CLIENTE)).rejects.toThrowError();
    });
  });
});