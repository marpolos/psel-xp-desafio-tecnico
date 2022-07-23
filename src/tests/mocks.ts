import Cliente from '../classes/Cliente';

const ID = 1;

const ID_INVALID = 0;

const SALDO = 10;

const LENGTH_TOKEN = 20;

const SUPER_SALDO = 1000000;

const SACAR = 'sacar';

const DEPOSITAR = 'depositar';

const NEW_CLIENTE: Omit<Cliente, 'codCliente'> = {
  nome: 'teste', saldo: 200, ativos: [], senha: 'mariadb',
};

const NOT_CLIENTE: Omit<Cliente, 'codCliente'> = {
  nome: 'teste-not', saldo: 200, ativos: [], senha: 'xxxxxxxx',
};

const ativosMock = [
  {
    codAtivo: 1,
    nome: 'ZOOM',
    qtde: 850,
    valor: '98.63',
  },
  {
    codAtivo: 2,
    nome: 'PETR4',
    qtde: 1000,
    valor: '27.80',
  },
  {
    codAtivo: 3,
    nome: 'VALE3',
    qtde: 1000,
    valor: '67.88',
  },
];

const contasMock = [
  {
    codCliente: 1,
    nome: 'Marta Maria',
    saldo: '7000.00',
  },
  {
    codCliente: 2,
    nome: 'Clarice Antunes',
    saldo: '8000.00',
  },
  {
    codCliente: 3,
    nome: 'Roberta Cristina',
    saldo: '1000.00',
  },
];

const investimentosMock = [
  {
    codCliente: 6,
    codAtivo: 7,
    qtde: 10,
    valorAtivo: '310.00',
  },
];

export {
  ativosMock, contasMock, investimentosMock, ID,
  ID_INVALID, SALDO, SACAR, DEPOSITAR,
  SUPER_SALDO, NEW_CLIENTE, NOT_CLIENTE,
  LENGTH_TOKEN,
};
