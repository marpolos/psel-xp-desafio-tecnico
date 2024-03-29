import { Pool, ResultSetHeader } from 'mysql2/promise';
import Cliente from '../classes/Cliente';
import { AtualizarConta } from '../interfaces/typeAtualizarConta';
import { HttpException } from '../middlewares/middleError';
import { generateToken } from '../utils/jwt';

export default class ContaModel {
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
    
    // cliente retorna um {} porque é um [[]]
    return cliente;
  }

  public async atualizarConta(id: number, saldo: number, type: AtualizarConta) {
    const query = 'UPDATE cliente SET saldo=? WHERE id=?';

    const cliente = await this.getById(id);
    if (!cliente) throw new HttpException(404, 'Cliente não encontrado');

    const saldoInDB = Number(cliente.saldo);
    if (type === 'sacar' && saldoInDB < saldo) throw new HttpException(400, 'Saldo insuficiente');

    const newSaldo: number = type === 'depositar' ? saldoInDB + saldo : saldoInDB - saldo; 
    const [upConta] = await this.connection.execute<ResultSetHeader>(query, [newSaldo, id]);

    if (upConta.affectedRows === 0) throw new HttpException(409, 'Erro ao atualizar conta.');

    const newConta = await this.getById(id); 
    return newConta;
  }

  public async clienteExiste(nome: string, senha: string) {
    const query = 'SELECT * FROM cliente WHERE nome=? AND senha=?';
    const [clienteExiste] = await this.connection.execute(query, [nome, senha]);

    const [find] = clienteExiste as Cliente[];
    
    return find;
  }

  public async createConta(cliente: Omit<Cliente, 'codCliente'>) {
    const query = 'INSERT INTO cliente (nome, saldo, senha) VALUES (?, ?, ?)';
    const { nome, saldo, senha } = cliente;

    const alreadyExist = await this.clienteExiste(nome, senha!);
    
    // 400 bad request
    if (alreadyExist) throw new HttpException(400, 'Cliente já existe.');

    await this.connection.execute(query, [nome, saldo, senha]);

    const token = generateToken(cliente);
    return token;
  }

  public async loginConta(cliente: Omit<Cliente, 'codCliente'>) {
    const { nome, senha } = cliente;

    // Usei essa fonte para me ajudar: https://dev.to/vitordelfino/autenticacao-com-jwt-22o7
    const alreadyExist = await this.clienteExiste(nome, senha!);

    // 404 not found
    if (!alreadyExist) throw new HttpException(404, 'Cliente não encontrado');
      
    const token = generateToken(alreadyExist);
    return token;
  }
}