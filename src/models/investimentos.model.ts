import { Pool, ResultSetHeader } from 'mysql2/promise';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import AtivosModel from './ativos.model';
import ContaModel from './contas.model';
import IMessage from '../interfaces/IMessage';

export interface IDBReturnMatch {
  id_cliente: number;
  id_ativo: number;
  qtde: number;
  valor_ativo: number;
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
  public async matchAtivoCliente(codCliente: number, codAtivo: number): Promise<IDBReturnMatch> {
    const query = 'SELECT * FROM cliente_ativo WHERE id_cliente = ? AND id_ativo = ?;';
    const [rows] = await this.connection.execute(query, [codCliente, codAtivo]);
    const [match] = rows as IDBReturnMatch[];

    return match;
  }

  public async criarMatch(codCliente: number, codAtivo: number, qtde: number, valorAtivo: number) {
    const query = 'INSERT INTO cliente_ativo (id_cliente, id_ativo, qtde, valor_ativo) VALUES (?, ?, ?, ?);';
    const result = await this.connection
      .execute<ResultSetHeader>(query, [codCliente, codAtivo, qtde, valorAtivo]);
    const [dataInserted] = result;
    if (dataInserted.affectedRows === 0) return { };
    return {
      codCliente, codAtivo, qtde, valorAtivo,
    };
  }

  // método para atualizar o match de ativo com cliente
  public async atualizarMatch(codCliente: number, codAtivo: number, qtde: number) {
    const query = 'UPDATE cliente_ativo SET qtde = ?, updated = ? WHERE id_cliente = ? AND id_ativo = ?;';
    const [upRelation] = await this.connection
      .execute<ResultSetHeader>(query, [qtde, new Date(), codCliente, codAtivo]);
    if (upRelation.affectedRows === 0) return { };
    const newRelation = await this.matchAtivoCliente(codCliente, codAtivo);
    return newRelation;
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
    const deposito: number = qtde * Number(isMatch.valor_ativo);
    const atualizarCliente = await this.contaModel.atualizarConta(codCliente, deposito, 'depositar');
    if (!atualizarCliente) return { message: 'Erro ao atualizar conta. ' };

    // Sexto, retornar novo match
    const newRelation = await this.matchAtivoCliente(codCliente, codAtivo);
    const {
      id_cliente: codCli, id_ativo: codAt, qtde: newQ, valor_ativo: valorAtivo,
    } = newRelation;
    const dataTratado = {
      codCliente: codCli,
      codAtivo: codAt,
      qtde: newQ,
      valorAtivo,
    };
    return dataTratado as IAtivoCliente;
  }

  public async comprarAtivo(data: IAtivoCliente): Promise<IAtivoCliente | IMessage> {
    const { codAtivo, codCliente, qtde } = data;
    // Primeiro, verificar se a qtde para comprar é <= a qtde do ativo
    const ativo = await this.ativosModel.getById(codAtivo);
    if (!ativo) return { message: 'Ativo não encontrado.' };
    const qtdeAtivo = Number(ativo.qtde);
    if (qtde > qtdeAtivo) return { message: 'Quantidade de ativo maior que a disponível.' };

    // Segundo, Verificar se o cliente tem o saldo para comprar o ativo
    const saldoCliente = await this.contaModel.getById(codCliente);
    if (!saldoCliente) return { message: 'Cliente não encontrado.' };
    const saldo = Number(saldoCliente.saldo);
    if (saldo < qtde * Number(ativo.valor)) return { message: 'Cliente não tem saldo para comprar o ativo.' };

    // Terceiro, atualizar saldo cliente
    const saque: number = qtde * Number(ativo.valor);
    // Aqui passo null como type porque quero sacar da conta para comprar o ativo
    const atualizarCliente = await this.contaModel.atualizarConta(codCliente, saque, null);
    if (!atualizarCliente) return { message: 'Erro ao atualizar conta. ' };
    
    // Quarto, verifica se o cliente já tem esse ativo, se não, cria um novo
    const isMatch = await this.matchAtivoCliente(codCliente, codAtivo);
    if (!isMatch) {
      const newMatch = await this.criarMatch(codCliente, codAtivo, qtde, ativo.valor);
      if (!newMatch) return { message: 'Erro ao criar match.' };
    }
    // Quinto, atualizar o match se ele já existe
    if (isMatch) {
      const upMatch = await this.atualizarMatch(codCliente, codAtivo, Number(isMatch.qtde) + qtde);
      if (!upMatch) return { message: 'Erro ao atualizar match.' };
    }
    // Sexto, atualiza a tabela de ativo
    const atualizarAtivo = await this.ativosModel.atualizarAtivo(codAtivo, qtde, 'comprar');
    if (!atualizarAtivo) return { message: 'Erro ao atualizar ativo. ' };

    // Sétimo, retorna novo match
    const newRelation = await this.matchAtivoCliente(codCliente, codAtivo);
    const {
      id_cliente: codCli, id_ativo: codAt, qtde: newQ, valor_ativo: valorAtivo,
    } = newRelation;
    const dataTratado = {
      codCliente: codCli,
      codAtivo: codAt,
      qtde: newQ,
      valorAtivo,
    };
    return dataTratado as IAtivoCliente;
  }
}
