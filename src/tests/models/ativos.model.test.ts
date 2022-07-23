import connection from '../../db/connection';
import { HttpException } from '../../middlewares/middleError';
import AtivosModel from '../../models/ativos.model';
import { ID, ID_INVALID } from '../mocks';

describe('Testa o service dos ativos', () => {
  let model: AtivosModel;

  beforeAll(() => {
    model = new AtivosModel(connection);
  });

  describe('Método getAll', () => {
    it('Verifica se retorna um array de ativos', async () => {
      const result = await model.getAll();
      expect(typeof result).toBe('object');
    });
  });

  describe('Método getById', () => {
    it('Quando passa um id válido retorna um objeto com id, qtde, valor, nome', async () => {
      const response = await model.getById(ID);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('nome');
      expect(response).toHaveProperty('valor');
      expect(response).toHaveProperty('qtde');
    });
    it('Quando envia um id inválido lança um erro', async () => {
      await expect(model.getById(ID_INVALID)).rejects.toEqual(
        new HttpException(404, 'Ativo não encontrado.'),
      );
    });
  });

  describe('Método getByIdCliente', () => {
    it('Ao enviar um id de um cliente que tenha ativos retorna um array de ativos', async () => {
      const result = await model.getByIdCliente(ID);
      
      expect(typeof result).toBe('object');
      expect(result[0]).toHaveProperty('valorAtivo');
      expect(result[0]).toHaveProperty('codAtivo');
      expect(result[0]).toHaveProperty('codCliente');
      expect(result[0]).toHaveProperty('qtde');
    });
    it('Ao enviar o id de um cliente sem ativos lança um erro', async () => {
      await expect(model.getByIdCliente(ID_INVALID)).rejects.toEqual(
        new HttpException(404, 'Esse cliente não possui ativos.'),
      );
    });
  });

  describe('Método atualizarAtivo', () => {});
});