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
    // Criei um interface para meu retorno do service que gosto
    const contas = await this.model.getAll();
    if (!contas.length) return { statusCode: 204, message: 'Nenhuma conta encontrada' };

    return {
      statusCode: 200,
      data: contas as Cliente[],
    };
  }

  public async getById(id: number): Promise<IService<Cliente>> {
    const conta = await this.model.getById(id);

    // Não existe possibilidade de dar erro aqui porque deu throw na model.
    if (!conta) return { statusCode: 404, message: 'Conta não encontrada' };
    return {
      statusCode: 200,
      data: conta as Cliente,
    };
  }

  public async atualizarConta(id: number, saldo: number, type: AtualizarConta) {
    const cliente = await this.model.atualizarConta(Number(id), Number(saldo), type);
    // status 409 indica conflito
    if (!cliente) return { statusCode: 409, message: 'Problema ao atualizar saldo' };

    return {
      statusCode: 200,
      data: cliente as Cliente,
    };
  }

  public async createConta(cliente: Cliente): Promise<IService<string>> {
    const token = await this.model.createConta(cliente);

    // 409 porque houve algum conflito na criação da conta
    if (!token) return { statusCode: 409, message: 'Problema ao criar conta' };

    return {
      statusCode: 201,
      data: token,
    };
  }

  public async loginConta(cliente: Omit<Cliente, 'codCliente'>) {
    const token = await this.model.loginConta(cliente);
    if (!token) return { statusCode: 404, message: 'Conta não encontrada' };

    return {
      statusCode: 200,
      data: token,
    };
  }
}

export default new ContaService();