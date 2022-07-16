import { Pool, ResultSetHeader } from 'mysql2/promise';
import Cliente from '../classes/Cliente';
// import { HttpException } from '../middlewares/middleError';

export default class ContaModel {
  // Primeiro eu cria a connection do type poll e inicializo
  public connection: Pool;

  constructor(conn: Pool) {
    this.connection = conn;
  }

  public async getAll(): Promise<Cliente[]> {
    const query = 'SELECT * FROM cliente';
    const [clientes] = await this.connection.execute(query);
    return clientes as Cliente[];
    // return rows.map((row) => new Cliente(row.id, row.nome, row.cpf, row.email, row.senha));
  }

  public async getById(id: number): Promise<Cliente> {
    const query = 'SELECT * FROM cliente WHERE id = ?';
    const [rows] = await this.connection.execute(query, [id]);
    const [cliente] = rows as Cliente[];
    // retorna um {} porque é um [[]]
    // Decidi retirar os as Cliente para tratar tudo no service.
    return cliente;
  }

  public async atualizarConta(id: number, saldo: number, type: string | null) {
    const query = 'UPDATE cliente SET saldo=? WHERE id=?';

    const cliente = await this.getById(id);
    if (!cliente) return {};/* throw new HttpException(404, 'Cliente não encontrado'); */

    const saldoInDB = Number(cliente.saldo);
    if (!type && saldoInDB < saldo) return {};
    /* throw new HttpException(400, 'Saldo insuficiente'); */

    // Se type vier preenchido então eu quero depositar na conta, somar.
    const newSaldo: number = type ? saldoInDB + saldo : saldoInDB - saldo; 
    const [upConta] = await this.connection.execute<ResultSetHeader>(query, [newSaldo, id]);

    if (upConta.affectedRows === 0) return {};

    const newConta = await this.getById(id); 
    return newConta;
  }
}