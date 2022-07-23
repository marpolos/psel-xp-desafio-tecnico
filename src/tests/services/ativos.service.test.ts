import { HttpException } from '../../middlewares/middleError';
import AtivosService from '../../services/ativos.service';
import { ID, ID_INVALID } from '../mocks';

describe('Testa o service dos ativos', () => {
  const service: AtivosService = new AtivosService();

  /* beforeAll(() => {
    service = new AtivosService();
  }); */

  describe('Método getAll', () => {
    it('Retorna status 200 e um data de array', async () => {
      const response = await service.getAll();

      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Método getById', () => {
    it('Se o ativo existe retorna status 200 e um data', async () => {
      const response = await service.getById(ID);

      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
    it('Se busca um id inválido lança um erro', async () => {
      await expect(service.getById(ID_INVALID)).rejects.toEqual(
        new HttpException(404, 'Ativo não encontrado.'),
      );
    });
  });

  describe('Método getByIdCliente', () => {
    it('Ao enviar o id de um cliente que tem ativos retorna um array', async () => {
      const response = await service.getByIdCliente(ID);
      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response).not.toHaveProperty('message');
      expect(response.statusCode).toBe(200);
    });
    it('Ao enviar o id de um cliente sem ativos retorna status 204', async () => {
      const response = await service.getByIdCliente(ID_INVALID);
      expect(response.statusCode).toBe(204);
      expect(response).toHaveProperty('message');
    });
  });
});