import InvestimentosModel from '../models/investimentos.model';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import connection from '../db/connection';
import IService from '../interfaces/IService';

export default class InvestimentosService {
  constructor(public investimentosModel = new InvestimentosModel(connection)) {}

  public async venderAtivo(id_ativo: number, id_cliente: number, qtde: number):
  Promise<IService<IAtivoCliente>> {
    const data = {
      id_ativo, id_cliente, qtde,
    };
    const investimento = await this.investimentosModel.venderAtivo(data);
    if (!investimento) return { statusCode: 409, message: 'Problema ao vender ativo' };
    console.log("investir", investimento);
    const { message } = investimento;
    if (message) return { statusCode: 409, message };
    return {
      statusCode: 200,
      data: investimento as IAtivoCliente,
    };
  }
}