import Joi from 'joi';

const schemaInvestimentos = Joi.object({
  codCliente: Joi.number().min(1).required().messages({
    'any.required': 'O código do cliente é obrigatório',
    'number.min': 'O código do cliente deve ser maior que 0',
  }),
  codAtivo: Joi.number().min(1).required().messages({
    'any.required': 'O código do ativo é obrigatório',
    'number.min': 'O código do ativo deve ser maior que 0',
  }),
  valorAtivo: Joi.number().min(1).messages({
    'number.min': 'O valor do ativo deve ser maior que 0',
  }),
  qtde: Joi.number().min(1).required().messages({
    'any.required': 'A quantidade do ativo é obrigatória',
    'number.min': 'A quantidade do ativo deve ser maior que 0',
  }),
});

// Para quando criar um post de ativos
const schemaAtivos = Joi.object({
  codAtivo: Joi.number().min(1),
  nome: Joi.string().min(3).required(),
  valor: Joi.number().min(1).required(),
  qtde: Joi.number().min(1).required(),
});

const schemaCliente = Joi.object({
  codCliente: Joi.number().min(1).required().messages({
    'any.required': 'O código do cliente é obrigatório',
    'number.min': 'O código do cliente deve ser maior que 0',
  }),
  nome: Joi.string().min(3).messages({
    'string.min': 'O nome do cliente deve ter no mínimo 3 caracteres',
  }),
  saldo: Joi.number().min(1).required().messages({
    'any.required': 'O saldo do cliente é obrigatório',
    'number.min': 'O saldo do cliente deve ser maior que 0',
  }),
  ativos: Joi.array().items(schemaAtivos).messages({
    'array.items': 'O ativo deve ser um array',
  }),
});

const schemaCreateCliente = Joi.object({
  nome: Joi.string().min(3).required().messages({
    'any.required': 'O nome do cliente é obrigatório',
    'string.min': 'O nome do cliente deve ter no mínimo 3 caracteres',
  }),
  saldo: Joi.number().min(1).required().messages({
    'any.required': 'O saldo do cliente é obrigatório',
    'number.min': 'O saldo do cliente deve ser maior que 0',
  }),
});

export {
  schemaAtivos, schemaCliente, schemaInvestimentos, schemaCreateCliente
};
