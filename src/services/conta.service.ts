import ContaModel from '../models/contas.model';
import Cliente from '../classes/Cliente';
import connection from '../db/connection';
import IService from '../interfaces/IService';

class ContaService {
  public _model: ContaModel;

  constructor() {
    this._model = new ContaModel(connection);
  }

  public async getAll(): Promise<IService<Cliente>> {
    // Criei um interface para meu retorno do service que gosto
    const contas = await this._model.getAll();
    if (!contas) return { statusCode: 204, message: 'Nenhuma conta encontrada' };

    return {
      statusCode: 200,
      data: contas as Cliente[],
    };
  }

  public async getById(id: number): Promise<IService<Cliente>> {
    const conta = await this._model.getById(id);

    if (!conta) return { statusCode: 404, message: 'Conta não encontrada' };
    return {
      statusCode: 200,
      data: conta as Cliente,
    };
  }

  public async atualizarConta(id: number, saldo: number, type: string | null) {
    const cliente = await this._model.atualizarConta(Number(id), Number(saldo), type);
    // status 409 indica conflito
    if (!cliente) return { statusCode: 409, message: 'Problema ao atualizar saldo' };

    return {
      statusCode: 200,
      data: cliente as Cliente,
    };
  }
}

export default new ContaService();