import connection from '../../db/connection';
import IAtivoCliente from '../../interfaces/IAtivoCliente';
import ContaModel from '../../models/contas.model';
import InvestimentoModel from '../../models/investimentos.model';
import { ID, ID_INVALID, QTDE } from '../mocks';

describe('Testa o model dos investimentos', () => {
  const model = new InvestimentoModel(connection);
  const modelCliente = new ContaModel(connection);

  describe('Método matchAtivoCliente', () => {
    it('Ao enviar codCliente e codAtivo relacionados retorna um único objeto', async () => {
      const response = await model.matchAtivoCliente(ID, ID);
      expect(typeof response).toBe('object');
      expect(response.id_ativo).toBeDefined();
      expect(response.id_cliente).toBeDefined();
    });
    it('Ao enviar codCliente e codAtivo não relacionados retorna um objeto vazio', async () => {
      const response = await model.matchAtivoCliente(ID, ID_INVALID);
      expect(response).not.toBeDefined();
    });
  });

  describe('Método venderAtivo', () => {
    it('SUCESS - ao enviar codAtivo, codCliente e qtde o cliente vende um ativo e seu saldo aumenta', async () => {
      const { saldo } = await modelCliente.getById(ID);
      
      const data: IAtivoCliente = { codCliente: ID, codAtivo: ID, qtde: QTDE };
      await model.venderAtivo(data);

      const { saldo: newSaldo } = await modelCliente.getById(ID);
      
      expect(Number(saldo)).toBeLessThan(Number(newSaldo));
    });
  });

  describe('Método comprarAtivo', () => {
    it('SUCESS - ao enviar codAtivo, codCliente e qtde o cliente compra um ativo e seu saldo diminui', async () => {
      const { saldo } = await modelCliente.getById(ID);
      
      const data: IAtivoCliente = { codCliente: ID, codAtivo: ID, qtde: QTDE };
      await model.comprarAtivo(data);

      const { saldo: newSaldo } = await modelCliente.getById(ID);
      
      expect(Number(saldo)).toBeGreaterThan(Number(newSaldo));
    });
  });
});