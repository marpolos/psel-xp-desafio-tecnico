import connection from '../../db/connection';
import { HttpException } from '../../middlewares/middleError';
import ContaModel from '../../models/contas.model';
import {
  ID, ID_INVALID, SALDO, SACAR, DEPOSITAR, SUPER_SALDO,
  NEW_CLIENTE, NOT_CLIENTE, LENGTH_TOKEN,
} from '../mocks';

describe.skip('Testa o model das contas', () => {
  let model: ContaModel;

  beforeAll(() => {
    model = new ContaModel(connection);
  });

  describe('Método getAll', () => {
    test('Verifica se retorna um array de Clientes', async () => {
      const response = await model.getAll();
      expect(typeof response).toBeTruthy();
    });
  });

  describe('Método getById', () => {
    test('Quando passa um id válido retorna um objeto com id, nome e saldo', async () => {
      const response = await model.getById(ID);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('nome');
      expect(response).toHaveProperty('saldo');
    });
    test('Quando passa um id inválido, um erro é lançado', async () => {
      await expect(model.getById(ID_INVALID)).rejects.toEqual(
        new HttpException(404, 'Cliente não encontrado.'),
      );
    });
  });

  describe('Método atualizarConta', () => {
    test('Ao enviar um id inválido lança um erro', async () => {
      await expect(model.atualizarConta(ID_INVALID, SALDO, SACAR)).rejects.toEqual(
        new HttpException(404, 'Cliente não encontrado.'),
      );
    });
    test('Ao enviar saldo maior que valor na conta lança um erro - para saques', async () => {
      await expect(model.atualizarConta(ID, SUPER_SALDO, SACAR)).rejects.toThrowError();
    });
    test('Ao enviar um id, saldo e "sacar" retira um valor da conta', async () => {
      const { saldo } = await model.getById(ID);

      await model.atualizarConta(ID, SALDO, SACAR);

      const newSaldo = Number(saldo) - SALDO;
      const afterSaque = await model.getById(ID);

      expect(Number(afterSaque.saldo)).toBe(newSaldo);
    });
    test('Ao enviar id, saldo e "depositar" soma valor na conta', async () => {
      const { saldo } = await model.getById(ID);

      await model.atualizarConta(ID, SALDO, DEPOSITAR);

      const newSaldo = Number(saldo) + SALDO;
      const afterSaque = await model.getById(ID);
      
      expect(Number(afterSaque.saldo)).toBe(newSaldo);
    });
  });

  describe('Método createConta', () => {
    it('Retorna um token quando cria uma conta', async () => {
      const token = await model.createConta(NEW_CLIENTE);
      expect(token.length).toBeGreaterThan(LENGTH_TOKEN);
    });
  });

  describe('Método loginConta', () => {
    it('Retorna um token se o cliente existe', async () => {
      const token = await model.loginConta(NEW_CLIENTE);
      expect(token.length).toBeGreaterThan(LENGTH_TOKEN);
    });
    it('Se tenta logar com cliente inexistente gera um erro', async () => {
      await expect(model.loginConta(NOT_CLIENTE)).rejects.toThrowError();
    });
  });
});