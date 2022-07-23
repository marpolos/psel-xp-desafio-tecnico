import { HttpException } from '../../middlewares/middleError';
import contasService from '../../services/contas.service';
import {
  DEPOSITAR, ID, ID_INVALID, SACAR, SALDO, SUPER_SALDO, 
} from '../mocks';

describe('Testa o service das contas', () => {
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
      await expect(contasService.getById(ID_INVALID)).rejects.toEqual(
        new HttpException(404, 'Cliente não encontrado.'),
      );
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
        new HttpException(404, 'Cliente não encontrado.'),
      );
    });
    it('Se o valor para saque for maior que o na conta lança um erro', async () => {
      await expect(contasService.atualizarConta(ID, SUPER_SALDO, SACAR)).rejects.toEqual(
        new HttpException(400, 'Saldo insuficiente'),
      );
    });
  });

  describe('Método createConta', () => {
    it('Ao criar um usuário com sucesso retorna status 201', async () => {});
    it('Se não cria a conta retorna status 409', async () => {});
  });

  describe('Método loginConta', () => {
    it('Se realiza login com sucesso retorna status 200', async () => {});
    it('Se há erro no login retorna status 404', async () => {});
  });
});