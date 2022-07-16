import { Pool, ResultSetHeader } from 'mysql2/promise';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import AtivosModel from './ativos.model';
import ContaModel from './contas.model';

export interface IMessage {
  message: string;
}

export default class InvestimentoModel {
  public connection: Pool;

  public ativosModel: AtivosModel;

  public contaModel: ContaModel;

  constructor(conn: Pool) {
    this.connection = conn;
    this.ativosModel = new AtivosModel(conn);
    this.contaModel = new ContaModel(conn);
  }

  // método para facilitar a busca de matches cliente - ativo
  public async matchAtivoCliente(codCliente: number, codAtivo: number): Promise<IAtivoCliente> {
    const query = 'SELECT * FROM cliente_ativo WHERE id_cliente = ? AND id_ativo = ?;';
    const [rows] = await this.connection.execute(query, [codCliente, codAtivo]);
    const [match] = rows as IAtivoCliente[];
    return match;
  }

  // método para atualizar o match de ativo com cliente
  public async atualizarMatch(codCliente: number, codAtivo: number, qtde: number) {
    const query = 'UPDATE cliente_ativo SET qtde = ?, updated = ? WHERE id_cliente = ? AND id_ativo = ?;';
    const [upRelation] = await this.connection
      .execute<ResultSetHeader>(query, [qtde, new Date(), codCliente, codAtivo]);
    if (upRelation.affectedRows === 0) return { };
    const newRelation = await this.matchAtivoCliente(codCliente, codAtivo);
    return newRelation as IAtivoCliente;
  }

  public async venderAtivo(data: IAtivoCliente): Promise<IAtivoCliente | IMessage> {
    const { codAtivo, codCliente, qtde } = data;
    // Primeiro, verificar se o cliente está relacionado ao ativo
    const isMatch = await this.matchAtivoCliente(codCliente, codAtivo);
    if (!isMatch) return { message: 'Cliente não relacionado ao ativo.' };

    // Segundo, Verificar se o cliente tem a qtde de ativo para vender
    const qtdeCliente = Number(isMatch.qtde) >= qtde;
    if (!qtdeCliente) return { message: 'Cliente não tem a quantidade de ativo para vender.' };

    // Terceiro, atualizar relação cliente-ativo
    const upMatch = await this.atualizarMatch(codCliente, codAtivo, Number(isMatch.qtde) - qtde);
    if (!upMatch) return { message: 'Erro ao atualizar match.' };

    // Quarto, atualizar o ativo
    const atualizarAtivo = await this.ativosModel.atualizarAtivo(codAtivo, qtde, 'vender');
    if (!atualizarAtivo) return { message: 'Erro ao atualizar ativo. ' };
    
    // Quinto, atualizar o saldo do  cliente
    const deposito: number = qtde * Number(isMatch.valorAtivo);
    const atualizarCliente = await this.contaModel.atualizarConta(codCliente, deposito, 'depositar');
    if (!atualizarCliente) return { message: 'Erro ao atualizar conta. ' };

    // Sexto, retornar novo match
    const newRelation = await this.matchAtivoCliente(codCliente, codAtivo);
    return newRelation as IAtivoCliente;
  }
}
