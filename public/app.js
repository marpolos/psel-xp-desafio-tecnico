"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var contas_routes_1 = __importDefault(require("./routes/contas.routes"));
var middleError_1 = __importDefault(require("./middlewares/middleError"));
var ativos_routes_1 = __importDefault(require("./routes/ativos.routes"));
var investimentos_routes_1 = __importDefault(require("./routes/investimentos.routes"));
var validateSchemas_1 = require("./middlewares/validateSchemas");
var validateToken_1 = __importDefault(require("./middlewares/validateToken"));
// Problema na validação: https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/contas', contas_routes_1.default);
app.use('/ativos', validateToken_1.default, validateSchemas_1.validateAtivos, ativos_routes_1.default);
app.use('/investimentos', validateToken_1.default, validateSchemas_1.validateInvestimentos, investimentos_routes_1.default);
// Aqui vai o middle de erro para qualquer problema;
app.use(middleError_1.default);
exports.default = app;
