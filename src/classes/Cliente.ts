import ICliente from '../interfaces/ICliente';
import Ativo from './Ativo';

export default class Cliente implements ICliente {
  constructor(
    private _nome: string, 
    private _saldo: number,
    private _codCliente?: number, 
    private _ativos?: Ativo[],
    private _senha?: string,
  ) {}

  public get codCliente(): number {
    return this._codCliente;
  }

  public set codCliente(value: number) {
    this._codCliente = value;
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

  public get senha(): string {
    return this._senha;
  }
  
  public set senha(value: string) {
    this._senha = value;
  }
}