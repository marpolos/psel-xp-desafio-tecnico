import { Pool, ResultSetHeader } from 'mysql2/promise';
import Cliente from '../classes/Cliente';
import { HttpException } from '../middlewares/middleError';

export default class ContaModel {
  // Primeiro eu cria a connection do type poll e inicializo
  public _connection: Pool;
  constructor(connection: Pool) {
    this._connection = connection;
  }

  public async getAll(): Promise<Cliente[]> {
    const query = 'SELECT * FROM cliente';
    const [clientes] = await this._connection.execute(query);
    return clientes as Cliente[];
    // return rows.map((row) => new Cliente(row.id, row.nome, row.cpf, row.email, row.senha));
  }

  public async getById(id: number): Promise<Cliente> {
    const query = 'SELECT * FROM cliente WHERE id = ?';
    const [rows] = await this._connection.execute(query, [id]);
    const [cliente] = rows as Cliente[];
    // retorna um {} porque é um [[]]
    return cliente;
  }

  public async saque(id: number, conta: Cliente){
    const queryFind = 'SELECT * FROM cliente WHERE id = ?';
    const query = '';

    const [cliente] = await this._connection.execute<ResultSetHeader>(queryFind, [id]);
    if (!cliente) throw new HttpException(404, 'Cliente não encontrado');
    // cliente.saldo -= conta.saldo;
    await this._connection.execute(query, [id, conta.saldo]);
  }

}