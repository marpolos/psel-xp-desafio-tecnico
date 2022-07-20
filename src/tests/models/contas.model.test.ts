/* import sinon from 'sinon';
import { expect } from 'chai';
import connection from '../../db/connection';
import ContaModel from '../../models/contas.model';

import { contasMock } from '../mocks';
import Cliente from '../../classes/Cliente';

const contaModel = new ContaModel(connection);

describe('GET contas/{id}', () => {
  beforeAll(async() => {
    const callStubs = sinon.stub(connection, 'execute');
    callStubs.onCall(0).resolves(contasMock[0] as Cliente);
    callStubs.onCall(1).resolves({});
  });
  afterAll(async() => {
    connection.execute.restore();
  });
  test('Quando passa um id válido retorna um objeto com id, nome e saldo', () => {
  });
  test('Quando passa um id inválido retorna um objeto vazio', () => {
  });
}); */