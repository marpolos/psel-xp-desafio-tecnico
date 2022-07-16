import { Pool, ResultSetHeader } from 'mysql2/promise';
import Ativo from '../classes/Ativo';
import IAtivoCliente from '../interfaces/IAtivoCliente';

export default class AtivosModel {
  _connection: Pool;

  constructor(connection: Pool) {
    this._connection = connection;
  }

  public async getAll(): Promise<Ativo[]> {
    const query = 'SELECT * FROM ativo';
    const [ativos] = await this._connection.execute(query);
    return ativos as Ativo[];
  }

  public async getById(id: number): Promise<Ativo> {
    const query = 'SELECT * FROM ativo WHERE id = ?';
    const [rows] = await this._connection.execute(query, [id]);
    const [ativo] = rows as Ativo[];
    return ativo as Ativo;
  }

  public async getByIdCliente(id: number) {
    const query = 'SELECT * FROM cliente_ativo WHERE id_cliente = ?';
    const [rows] = await this._connection.execute(query, [id]);
    const ativos = Object.values(rows).map((row) => {
      const {
        id_cliente, id_ativo, qtde, valor_ativo, 
      } = row;
      return {
        id_cliente, id_ativo, qtde, valor_ativo, 
      } as IAtivoCliente;
    });
    return ativos as IAtivoCliente[];
  }
}