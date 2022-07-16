import Ativo from '../classes/Ativo';

export default interface ICliente {
  id?: number;
  nome?: string;
  saldo: number;
  ativos?: Ativo[];
}