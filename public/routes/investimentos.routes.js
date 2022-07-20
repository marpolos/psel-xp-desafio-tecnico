"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var investimentos_controller_1 = __importDefault(require("../controllers/investimentos.controller"));
var investimentoRoutes = express_1.default.Router();
// const investimentosController = new InvestimentosController();
investimentoRoutes.put('/vender', investimentos_controller_1.default.venderAtivo);
investimentoRoutes.post('/comprar', investimentos_controller_1.default.comprarAtivo);
exports.default = investimentoRoutes;
