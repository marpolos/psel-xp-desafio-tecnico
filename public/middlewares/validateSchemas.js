"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCriarConta = exports.validateCliente = exports.validateAtivos = exports.validateInvestimentos = void 0;
var middleError_1 = require("./middleError");
var schemas_1 = require("./schemas");
// Tornar dinâmico
/* const validateSchemas = (req: Request, res: Response, next: NextFunction, schema: ) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { message, type } = error.details[0];
    // Escolhi o 406 para dizer que é inaceitável esses dados.
    // O 400 é um bad request porque está vazio.
    const statusCode = type === 'any.required' ? 400 : 406;
    throw new HttpException(statusCode, message);
  }
  next();
}; */
var validateInvestimentos = function (req, res, next) {
    var error = schemas_1.schemaInvestimentos.validate(req.body).error;
    if (error) {
        var _a = error.details[0], message = _a.message, type = _a.type;
        // Escolhi o 406 para dizer que é inaceitável esses dados.
        // O 400 é um bad request porque está vazio.
        var statusCode = type === 'any.required' ? 400 : 406;
        throw new middleError_1.HttpException(statusCode, message);
    }
    next();
};
exports.validateInvestimentos = validateInvestimentos;
var validateCliente = function (req, _res, next) {
    var error = schemas_1.schemaCliente.validate(req.body).error;
    if (error) {
        var _a = error.details[0], message = _a.message, type = _a.type;
        var statusCode = type === 'any.required' ? 400 : 406;
        throw new middleError_1.HttpException(statusCode, message);
    }
    next();
};
exports.validateCliente = validateCliente;
var validateAtivos = function (req, _res, next) {
    // Para quando eu criar a rota de criar ativo -> post;
    next();
};
exports.validateAtivos = validateAtivos;
var validateCriarConta = function (req, _res, next) {
    var error = schemas_1.schemaCreateCliente.validate(req.body).error;
    if (error) {
        var _a = error.details[0], message = _a.message, type = _a.type;
        var statusCode = type === 'any.required' ? 400 : 406;
        throw new middleError_1.HttpException(statusCode, message);
    }
    next();
};
exports.validateCriarConta = validateCriarConta;
