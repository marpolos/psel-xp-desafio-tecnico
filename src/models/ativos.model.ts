import { Pool, ResultSetHeader } from 'mysql2/promise';
import Ativo from '../classes/Ativo';

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
  public async getByIdCliente(id: number): Promise<Ativo> {
    const query = 'SELECT * FROM ativo WHERE id = ?';
    const [rows] = await this._connection.execute(query, [id]);
    const [ativo] = rows as Ativo[];
    return ativo as Ativo;
  }
}