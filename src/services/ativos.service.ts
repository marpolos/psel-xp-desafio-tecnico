import AtivosModel from '../models/ativos.model';
import Ativo from '../classes/Ativo';
import connection from '../db/connection';
import IService from '../interfaces/IService';

export default class AtivosService {
  constructor(public ativosModel = new AtivosModel(connection)) { }

  public async getAll(): Promise<IService<Ativo>> {
    const ativos = await this.ativosModel.getAll();
    if (ativos.length === 0) return { statusCode: 204, message: 'Nenhum ativo encontrado' };
    return {
      statusCode: 200,
      data: ativos as Ativo[],
    };
  }

  public async getById(id: number): Promise<IService<Ativo>> {
    const ativo = await this.ativosModel.getById(id);

    if (!ativo) return { statusCode: 404, message: 'Ativo não encontrado' };
    return {
      statusCode: 200,
      data: ativo as Ativo,
    };
  }

  public async getByIdCliente(id: number) {
    const ativos = await this.ativosModel.getByIdCliente(id);
    if (!ativos) return { statusCode: 204, message: 'Nenhum ativo encontrado para esse cliente' };
    return {
      statusCode: 200,
      data: ativos,
    };
  }
}