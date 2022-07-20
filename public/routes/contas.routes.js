"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contas_controller_1 = __importDefault(require("../controllers/contas.controller"));
var validateSchemas_1 = require("../middlewares/validateSchemas");
var validateToken_1 = __importDefault(require("../middlewares/validateToken"));
// import { Request, Response, NextFunction } from 'express';
// import ContaService from '../services/conta.service';
var contasRoutes = express_1.default.Router();
// const contaController = new ContaController();
contasRoutes.get('/:id', validateToken_1.default, contas_controller_1.default.getById);
contasRoutes.get('/', validateToken_1.default, contas_controller_1.default.getAll);
// Aqui escolhi usar put porque estou fazendo update na conta já existente.
contasRoutes.put('/saque', validateToken_1.default, validateSchemas_1.validateCliente, contas_controller_1.default.atualizarConta);
contasRoutes.put('/deposito', validateToken_1.default, validateSchemas_1.validateCliente, contas_controller_1.default.atualizarConta);
contasRoutes.post('/', validateSchemas_1.validateCriarConta, contas_controller_1.default.createConta);
contasRoutes.post('/login', contas_controller_1.default.loginConta);
// const contaService = new ContaService();
/* contasRoutes.get('/12', async (_req: Request, res: Response): Promise<Response> => {
    const data = await contaService.getAll();
    return res.json(data);
}); */
exports.default = contasRoutes;
