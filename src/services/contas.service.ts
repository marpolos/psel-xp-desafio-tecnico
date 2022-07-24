import ContaModel from '../models/contas.model';
import Cliente from '../classes/Cliente';
import connection from '../db/connection';
import IService from '../interfaces/IService';
import { AtualizarConta } from '../interfaces/typeAtualizarConta';

class ContaService {
  public model: ContaModel;

  constructor() {
    this.model = new ContaModel(connection);
  }

  public async getAll(): Promise<IService<Cliente>> {
    const contas = await this.model.getAll();
    if (!contas.length) return { statusCode: 204, message: '' };

    return {
      statusCode: 200,
      data: contas as Cliente[],
    };
  }

  public async getById(id: number): Promise<IService<Cliente>> {
    const conta = await this.model.getById(id);
    
    if (!conta) return { statusCode: 404, message: 'Conta não encontrada' };
    return {
      statusCode: 200,
      data: conta as Cliente,
    };
  }

  public async atualizarConta(id: number, saldo: number, type: AtualizarConta) {
    const cliente = await this.model.atualizarConta(Number(id), Number(saldo), type);
    
    // Todos os erros serão lançados na model por envolverem o banco.

    return {
      statusCode: 200,
      data: cliente as Cliente,
    };
  }

  public async createConta(cliente: Omit<Cliente, 'codCliente'>): Promise<IService<string>> {
    const token = await this.model.createConta(cliente);

    // 409 porque houve algum conflito na criação da conta
    // Entrará aqui se houver um problema no JWT.
    if (!token) return { statusCode: 409, message: 'Problema ao gerar token' };

    return {
      statusCode: 201,
      data: token,
    };
  }

  public async loginConta(cliente: Omit<Cliente, 'codCliente'>) {
    const token = await this.model.loginConta(cliente);
    if (!token) return { statusCode: 409, message: 'Problema ao gerar token' };

    return {
      statusCode: 200,
      data: token,
    };
  }
}

export default new ContaService();