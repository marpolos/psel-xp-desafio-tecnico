"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ativos_controller_1 = __importDefault(require("../controllers/ativos.controller"));
var ativosRoutes = express_1.default.Router();
ativosRoutes.get('/:id', ativos_controller_1.default.getById);
ativosRoutes.get('/', ativos_controller_1.default.getAll);
ativosRoutes.get('/cliente/:id', ativos_controller_1.default.getByIdCliente);
exports.default = ativosRoutes;
