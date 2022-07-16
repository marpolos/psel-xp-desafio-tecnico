import ContaModel from "../models/conta.model";
import Cliente from "../classes/Cliente";
import connection from "../db/connection";
import IService from "../interfaces/IService";

class ContaService {
  public _model: ContaModel;
  constructor(){
    this._model = new ContaModel(connection);
  }

  public async getAll(): Promise<IService<Cliente>> {
    // Criei um interface para meu retorno do service que gosto
    const contas = await this._model.getAll();

    return {
        statusCode: 200,
        data: contas as Cliente[],
    };
  };

  public async getById(id: number): Promise<IService<Cliente>> {
    const conta = await this._model.getById(id);

    return {
        statusCode: 200,
        data: conta as Cliente,
    };
  }
}

export default new ContaService();