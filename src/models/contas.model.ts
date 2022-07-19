import { Pool, ResultSetHeader } from 'mysql2/promise';
import Cliente from '../classes/Cliente';
import { HttpException } from '../middlewares/middleError';
import { generateToken } from '../utils/jwt';
// import { HttpException } from '../middlewares/middleError';

export default class ContaModel {
  // Primeiro eu cria a connection do type poll e inicializo
  public connection: Pool;

  constructor(conn: Pool) {
    this.connection = conn;
  }

  public async getAll(): Promise<Cliente[]> {
    const query = 'SELECT id, nome, saldo FROM cliente';
    const [clientes] = await this.connection.execute(query);
    return clientes as Cliente[];
  }

  public async getById(id: number): Promise<Cliente> {
    const query = 'SELECT id, nome, saldo FROM cliente WHERE id = ?';
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

    // type null significa que quero retirar da conta sacar
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

  public async createConta(cliente: Omit<Cliente, 'codCliente'>) {
    const query = 'INSERT INTO cliente (nome, saldo, senha) VALUES (?, ?, ?)';
    const { nome, saldo, senha } = cliente;
    await this.connection.execute(query, [nome, saldo, senha]);

    const token = generateToken(cliente);
    return token;
  }

  public async loginConta(cliente: Omit<Cliente, 'codCliente'>) {
    const { nome, senha } = cliente;
    try {
      const query = 'SELECT * FROM cliente WHERE nome = ? AND senha = ?';
      const [clienteExiste] = await this.connection.execute(query, [nome, senha]);
      const [find] = clienteExiste as Cliente[];
      console.log(find);
      console.log('cli', clienteExiste);
      if (!find) return {};
      
      const token = generateToken(find);
      return token;
    } catch (err) {
      throw new HttpException(404, 'Cliente não encontrado');
    }
  }
}