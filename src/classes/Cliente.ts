import ICliente from '../interfaces/ICliente';
import Ativo from './Ativo';

export default class Cliente implements ICliente {
  constructor(
    private _nome: string, 
    private _saldo: number,
    private _id?: number, 
    private _ativos?: Ativo[],
  ) {}

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number | undefined) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get saldo(): number {
    return this._saldo;
  }

  public set saldo(value: number) {
    this._saldo = value;
  }

  public get ativos(): Ativo[] | undefined {
    return this._ativos;
  }

  public set ativos(value: Ativo[] | undefined) {
    this._ativos = value;
  }
}