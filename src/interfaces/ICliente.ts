import Ativo from '../classes/Ativo';

export default interface ICliente {
  codCliente: number;
  nome?: string;
  saldo: number;
  ativos?: Ativo[];
  senha?: string;
}