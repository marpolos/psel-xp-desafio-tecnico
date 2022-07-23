import { HttpException } from '../../middlewares/middleError';
import contasService from '../../services/contas.service';
import { ID, ID_INVALID } from '../mocks';

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
    it('Se atualiza com sucesso retorna status 200 e um data', () => {});
    it('Se não atualizar o saldo retorna status 409', () => {});
  });

  describe('Método createConta', () => {
    it('Ao criar um usuário com sucesso retorna status 201', () => {});
    it('Se não cria a conta retorna status 409', () => {});
  });

  describe('Método loginConta', () => {
    it('Se realiza login com sucesso retorna status 200', () => {});
    it('Se há erro no login retorna status 404', () => {});
  });
});