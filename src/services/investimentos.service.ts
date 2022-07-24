import InvestimentosModel from '../models/investimentos.model';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import connection from '../db/connection';
import IService from '../interfaces/IService';

export default class InvestimentosService {
  constructor(public investimentosModel = new InvestimentosModel(connection)) {}

  public async venderAtivo(codAtivo: number, codCliente: number, qtde: number):
  Promise<IService<IAtivoCliente>> {
    const data = {
      codCliente, codAtivo, qtde,
    };
    const investimento = await this.investimentosModel.venderAtivo(data);
    // Todos os erros são lançados na model por envolverem o banco.
    // Por segurança deixo o return.
    if (!investimento) return { statusCode: 409, message: 'Problema ao vender ativo' };
    
    return {
      statusCode: 200,
      data: investimento as IAtivoCliente,
    };
  }

  public async comprarAtivo(codAtivo: number, codCliente: number, qtde: number):
  Promise<IService<IAtivoCliente>> {
    const data = { codAtivo, codCliente, qtde };
    const investimento = await this.investimentosModel.comprarAtivo(data);
    
    // Todos os possíveis erros tratados na model por envolverem o banco.
    if (!investimento) return { statusCode: 409, message: 'Problema ao comprar ativo' };
    return {
      statusCode: 200,
      data: investimento as IAtivoCliente,
    };
  }

  public async listaInvestimentos(): Promise<IService<IAtivoCliente[]>> {
    const investimentos = await this.investimentosModel.listaInvestimentos();
    if (!investimentos.length) return { statusCode: 204, message: '' };
    return {
      statusCode: 200,
      data: investimentos as IAtivoCliente[],
    };
  }
}