"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var investimentos_controller_1 = __importDefault(require("../controllers/investimentos.controller"));
var validateSchemas_1 = require("../middlewares/validateSchemas");
var investimentoRoutes = express_1.default.Router();
investimentoRoutes.put('/vender', validateSchemas_1.validateInvestimentos, investimentos_controller_1.default.venderAtivo);
investimentoRoutes.post('/comprar', validateSchemas_1.validateInvestimentos, investimentos_controller_1.default.comprarAtivo);
investimentoRoutes.get('/', investimentos_controller_1.default.listaInvestimentos);
exports.default = investimentoRoutes;
