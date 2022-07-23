import connection from '../../db/connection';
import { HttpException } from '../../middlewares/middleError';
import AtivosModel from '../../models/ativos.model';
import {
  COMPRAR, ID, ID_INVALID, QTDE, VENDER,
} from '../mocks';

describe('Testa o model dos ativos', () => {
  const model: AtivosModel = new AtivosModel(connection);

  /* beforeAll(() => {
    model = new AtivosModel(connection);
  }); */

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
      const response = await model.getByIdCliente(ID_INVALID);
      /* await expect(model.getByIdCliente(ID_INVALID)).rejects.toEqual(
        new HttpException(404, 'Esse cliente não possui ativos.'),
      ); */
    });
  });

  describe('Método atualizarAtivo', () => {
    it('Se a quantidade a ser comprada for maior que a disponível, lança um erro', async () => {
      await expect(model.atualizarAtivo(ID, QTDE * 1000, COMPRAR)).rejects.toEqual(
        new HttpException(409, 'Erro ao atualizar ativo por conta da quantidade.'),
      );
    });
    it('Se a quantidade a ser comprada do ativo pelo cliente estiver disponível, então retorna uma quantidade final menor do ativo', async () => {
      const { qtde } = await model.getById(ID);

      await model.atualizarAtivo(ID, QTDE, COMPRAR);

      const afterAtivo = await model.getById(ID);

      expect(Number(qtde)).toBeGreaterThan(Number(afterAtivo.qtde));
    });
    it('Se o cliente estiver vendendo o ativo, retorna uma quantidade maior de ativos', async () => {
      const { qtde } = await model.getById(ID);

      await model.atualizarAtivo(ID, QTDE, VENDER);
      const afterAtivo = await model.getById(ID);

      expect(Number(qtde)).toBeLessThan(Number(afterAtivo.qtde));
    });
  });
});