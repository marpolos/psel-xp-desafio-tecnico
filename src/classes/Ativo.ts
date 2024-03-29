import IAtivo from '../interfaces/IAtivo';

export default class Ativo implements IAtivo {
  constructor(
    private _nome: string, 
    private _valor: number,
    private _qtde: number, 
    private _codAtivo?: number,
  ) {}
  
  public get codAtivo(): number | undefined {
    return this._codAtivo;
  }

  public set codAtivo(value: number | undefined) {
    this._codAtivo = value;
  }

  public get qtde(): number {
    return this._qtde;
  }

  public set qtde(value: number) {
    this._qtde = value;
  }

  public get valor(): number {
    return this._valor;
  }

  public set valor(value: number) {
    this._valor = value;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }
}