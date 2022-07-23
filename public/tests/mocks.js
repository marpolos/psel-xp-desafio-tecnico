"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QTDE = exports.COMPRAR = exports.VENDER = exports.LENGTH_TOKEN = exports.NOT_CLIENTE = exports.NEW_CLIENTE = exports.SUPER_SALDO = exports.DEPOSITAR = exports.SACAR = exports.SALDO = exports.ID_INVALID = exports.ID = exports.investimentosMock = exports.contasMock = exports.ativosMock = void 0;
var ID = 1;
exports.ID = ID;
var ID_INVALID = 0;
exports.ID_INVALID = ID_INVALID;
var SALDO = 10;
exports.SALDO = SALDO;
var LENGTH_TOKEN = 20;
exports.LENGTH_TOKEN = LENGTH_TOKEN;
var SUPER_SALDO = 1000000;
exports.SUPER_SALDO = SUPER_SALDO;
var SACAR = 'sacar';
exports.SACAR = SACAR;
var DEPOSITAR = 'depositar';
exports.DEPOSITAR = DEPOSITAR;
var VENDER = 'vender';
exports.VENDER = VENDER;
var COMPRAR = 'comprar';
exports.COMPRAR = COMPRAR;
var QTDE = 10;
exports.QTDE = QTDE;
var NEW_CLIENTE = {
    nome: 'teste', saldo: 200, ativos: [], senha: 'mariadb',
};
exports.NEW_CLIENTE = NEW_CLIENTE;
var NOT_CLIENTE = {
    nome: 'teste-not', saldo: 200, ativos: [], senha: 'xxxxxxxx',
};
exports.NOT_CLIENTE = NOT_CLIENTE;
var ativosMock = [
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
exports.ativosMock = ativosMock;
var contasMock = [
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
exports.contasMock = contasMock;
var investimentosMock = [
    {
        codCliente: 6,
        codAtivo: 7,
        qtde: 10,
        valorAtivo: '310.00',
    },
];
exports.investimentosMock = investimentosMock;
