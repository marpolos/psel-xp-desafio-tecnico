"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCreateCliente = exports.schemaInvestimentos = exports.schemaCliente = exports.schemaAtivos = void 0;
var joi_1 = __importDefault(require("joi"));
var schemaInvestimentos = joi_1.default.object({
    codCliente: joi_1.default.number().min(1).required().messages({
        'any.required': 'O código do cliente é obrigatório',
        'number.min': 'O código do cliente deve ser maior que 0',
    }),
    codAtivo: joi_1.default.number().min(1).required().messages({
        'any.required': 'O código do ativo é obrigatório',
        'number.min': 'O código do ativo deve ser maior que 0',
    }),
    valorAtivo: joi_1.default.number().min(1).messages({
        'number.min': 'O valor do ativo deve ser maior que 0',
    }),
    qtde: joi_1.default.number().min(1).required().messages({
        'any.required': 'A quantidade do ativo é obrigatória',
        'number.min': 'A quantidade do ativo deve ser maior que 0',
    }),
});
exports.schemaInvestimentos = schemaInvestimentos;
// Para quando criar um post de ativos - não usado no momento
var schemaAtivos = joi_1.default.object({
    codAtivo: joi_1.default.number().min(1),
    nome: joi_1.default.string().min(3).required(),
    valor: joi_1.default.number().min(1).required(),
    qtde: joi_1.default.number().min(1).required(),
});
exports.schemaAtivos = schemaAtivos;
var schemaCliente = joi_1.default.object({
    codCliente: joi_1.default.number().min(1).required().messages({
        'any.required': 'O código do cliente é obrigatório',
        'number.min': 'O código do cliente deve ser maior que 0',
    }),
    nome: joi_1.default.string().min(3).messages({
        'string.min': 'O nome do cliente deve ter no mínimo 3 caracteres',
    }),
    saldo: joi_1.default.number().min(1).required().messages({
        'any.required': 'O saldo do cliente é obrigatório',
        'number.min': 'O saldo do cliente deve ser maior que 0',
    }),
    ativos: joi_1.default.array().items(schemaAtivos).messages({
        'array.items': 'O ativo deve ser um array',
    }),
});
exports.schemaCliente = schemaCliente;
var schemaCreateCliente = joi_1.default.object({
    nome: joi_1.default.string().min(3).required().messages({
        'any.required': 'O nome do cliente é obrigatório',
        'string.min': 'O nome do cliente deve ter no mínimo 3 caracteres',
    }),
    senha: joi_1.default.string().min(5).required().messages({
        'any.required': 'A senha do cliente é obrigatória',
        'string.min': 'A senha do cliente deve ter no mínimo 5 caracteres',
    }),
    saldo: joi_1.default.number().min(1).required().messages({
        'any.required': 'O saldo do cliente é obrigatório',
        'number.min': 'O saldo do cliente deve ser maior que 0',
    }),
});
exports.schemaCreateCliente = schemaCreateCliente;
