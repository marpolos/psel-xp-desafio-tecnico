import Ativo from '../classes/Ativo';

export default interface ICliente {
  codCliente: number | undefined;
  nome?: string;
  saldo: number;
  ativos?: Ativo[];
  senha?: string;
}