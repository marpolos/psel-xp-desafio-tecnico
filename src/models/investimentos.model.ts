import { Pool, ResultSetHeader } from 'mysql2/promise';
import IAtivoCliente from '../interfaces/IAtivoCliente';
import AtivosModel from './ativos.model';

export interface IMessage {
  message: string;
}

export default class InvestimentoModel {
  public connection: Pool;

  public ativosModel: AtivosModel;

  constructor(conn: Pool) {
    this.connection = conn;
    this.ativosModel = new AtivosModel(conn);
  }

  /*  {
    "id": 1,
    "nome": "ZOOM",
    "qtde": 850,
    "valor": "98.63"
  } */

  // const data = id_ativo: number, id_cliente: number, qtde: number

  public async venderAtivo(data: IAtivoCliente): Promise<IAtivoCliente | IMessage> {
    const { id_ativo, id_cliente, qtde } = data;
    const query = 'UPDATE cliente_ativo SET qtde = ?, updated = ? WHERE id_cliente = ? AND id_ativo = ?;';

    // Primeiro, verificar se o ativo existe e se tem disponível para vender
    const ativo = await this.ativosModel.getById(data.id_ativo);
    const qtdeAtivoDB = ativo && Number(ativo.qtde);
    if (!ativo || qtdeAtivoDB - data.qtde < 0) return { message: 'Ativo escasso. ' };

    // Segundo, verificar se o cliente está relacionado ao ativo
    const relacionado = await this.ativosModel.getByIdCliente(id_cliente);
    const ativoRelacionado = relacionado && relacionado
      .find((ativoRel) => Number(ativoRel.id_ativo) === id_ativo);
    if (!relacionado || !ativoRelacionado) return { message: 'Cliente não relacionado ao ativo.' };

    // Terceiro, atualizar o ativo
    const atualizarAtivo = await this.ativosModel.atualizarAtivo(id_ativo, qtde, 'vender');
    if (!atualizarAtivo) return { message: 'Erro ao atualizar ativo. ' };

    // Quarto, atualizar relação cliente-ativo
    const [upRelation] = await this.connection
      .execute<ResultSetHeader>(query, [qtde, new Date(), id_cliente, id_ativo]);

    if (upRelation.affectedRows === 0) return { message: 'Erro ao vender ativo ' };

    // Quinto, retornar ativo atualizado
    const newRelation = (await this.ativosModel.getByIdCliente(id_cliente))
      .find((newAtivo) => newAtivo.id_ativo === id_ativo);

    return newRelation as IAtivoCliente;
  }
}
