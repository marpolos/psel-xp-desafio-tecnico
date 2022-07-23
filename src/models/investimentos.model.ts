import { Pool, ResultSetHeader } from 'mysql2/promise';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import AtivosModel from './ativos.model';
import ContaModel from './contas.model';
import { HttpException } from '../middlewares/middleError';

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

    // 409 conflit
    if (dataInserted.affectedRows === 0) throw new HttpException(409, 'Erro ao atualizar relação do cliente com ativo.');
    return {
      codCliente, codAtivo, qtde, valorAtivo,
    };
  }

  // método para atualizar o match de ativo com cliente
  public async atualizarMatch(codCliente: number, codAtivo: number, qtde: number) {
    const query = 'UPDATE cliente_ativo SET qtde = ?, updated = ? WHERE id_cliente = ? AND id_ativo = ?;';
    const [upRelation] = await this.connection
      .execute<ResultSetHeader>(query, [qtde, new Date(), codCliente, codAtivo]);

    if (upRelation.affectedRows === 0) throw new HttpException(409, 'Erro ao atualizar match.');

    const newRelation = await this.matchAtivoCliente(codCliente, codAtivo);
    return newRelation;
  }

  public async venderAtivo(data: IAtivoCliente): Promise<IAtivoCliente> {
    const { codAtivo, codCliente, qtde } = data;
    // Primeiro, verificar se o cliente está relacionado ao ativo
    const isMatch = await this.matchAtivoCliente(codCliente, codAtivo);
    // 409 indica algum conflito de informações
    if (!isMatch) throw new HttpException(409, 'Cliente não relacionado ao ativo.');

    // Segundo, Verificar se o cliente tem a qtde de ativo para vender
    const qtdeCliente = Number(isMatch.qtde) >= qtde;
    if (!qtdeCliente) throw new HttpException(409, 'Cliente não tem a quantidade de ativo para vender.');

    // Terceiro, atualizar relação cliente-ativo
    await this.atualizarMatch(codCliente, codAtivo, Number(isMatch.qtde) - qtde);

    // Quarto, atualizar o ativo
    await this.ativosModel.atualizarAtivo(codAtivo, qtde, 'vender');
    
    // Quinto, atualizar o saldo do  cliente
    const deposito: number = qtde * Number(isMatch.valor_ativo);
    await this.contaModel.atualizarConta(codCliente, deposito, 'depositar');

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

  public async comprarAtivo(data: IAtivoCliente): Promise<IAtivoCliente> {
    const { codAtivo, codCliente, qtde } = data;
    // Primeiro, verificar se a qtde para comprar é <= a qtde do ativo
    const ativo = await this.ativosModel.getById(codAtivo);
    if (!ativo) throw new HttpException(404, 'Ativo não encontrado.');

    const qtdeAtivo = Number(ativo.qtde);
    if (qtde > qtdeAtivo) throw new HttpException(409, 'Quantidade de ativo maior que a disponível.');

    // Segundo, Verificar se o cliente tem o saldo para comprar o ativo e se ele existe
    const saldoCliente = await this.contaModel.getById(codCliente);
    console.log('verifica cliente', saldoCliente);
    if (!saldoCliente) throw new HttpException(404, 'Cliente não encontrado.');

    const saldo = Number(saldoCliente.saldo);
    if (saldo < qtde * Number(ativo.valor)) throw new HttpException(409, 'Cliente não tem saldo para comprar o ativo.');

    // Terceiro, atualizar saldo cliente
    const saque: number = qtde * Number(ativo.valor);
    // Aqui passo null como type porque quero sacar da conta para comprar o ativo
    await this.contaModel.atualizarConta(codCliente, saque, 'sacar');
    
    // Quarto, verifica se o cliente já tem esse ativo, se não, cria um novo
    const isMatch = await this.matchAtivoCliente(codCliente, codAtivo);

    // Passei esse if para baixo como um else;
    // if (!isMatch) await this.criarMatch(codCliente, codAtivo, qtde, ativo.valor);

    // Quinto, atualizar o match se ele já existe
    if (isMatch) await this.atualizarMatch(codCliente, codAtivo, Number(isMatch.qtde) + qtde);
    else await this.criarMatch(codCliente, codAtivo, qtde, ativo.valor);

    // Sexto, atualiza a tabela de ativo
    await this.ativosModel.atualizarAtivo(codAtivo, qtde, 'comprar');

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

  public async listaInvestimentos(): Promise<IAtivoCliente[]> {
    const query = 'SELECT * FROM cliente_ativo';
    const [rows] = await this.connection.execute(query);
    const lista = Object.values(rows).map((row) => {
      const {
        id_cliente: codCliente, id_ativo: codAtivo, qtde, valor_ativo: valorAtivo, 
      } = row;
      return {
        codCliente,
        codAtivo,
        qtde,
        valorAtivo, 
      } as IAtivoCliente;
    });
    return lista as IAtivoCliente[];
  }
}
