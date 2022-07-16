import { Pool, ResultSetHeader } from 'mysql2/promise';
import Ativo from '../classes/Ativo';
import IAtivoCliente from '../interfaces/IAtivoCliente';

export default class AtivosModel {
  connection: Pool;

  constructor(conn: Pool) {
    this.connection = conn;
  }

  public async getAll(): Promise<Ativo[]> {
    const query = 'SELECT * FROM ativo';
    const [ativos] = await this.connection.execute(query);
    return ativos as Ativo[];
  }

  public async getById(id: number): Promise<Ativo> {
    const query = 'SELECT * FROM ativo WHERE id = ?';
    const [rows] = await this.connection.execute(query, [id]);
    const [ativo] = rows as Ativo[];
    return ativo as Ativo;
  }

  public async getByIdCliente(id: number) {
    const query = 'SELECT * FROM cliente_ativo WHERE id_cliente = ?';
    const [rows] = await this.connection.execute(query, [id]);
    const ativos = Object.values(rows).map((row) => {
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
    return ativos as IAtivoCliente[];
  }

  public async atualizarAtivo(id: number, qtde: number, type: string) {
    const query = 'UPDATE ativo SET qtde=? WHERE id=?';
    const ativo = await this.getById(id);
    if (!ativo) return {};
    const qtdeAtivoDB = Number(ativo.qtde);
    if (qtdeAtivoDB - qtde < 0) return {};

    const [upAtivo] = await this.connection
      .execute<ResultSetHeader>(
      query,
      [type === 'vender' ? qtdeAtivoDB + qtde : qtdeAtivoDB - qtde, id],
    );
      
    if (upAtivo.affectedRows === 0) return {};
    const newAtivo = await this.getById(id);
    return newAtivo;
  }
}