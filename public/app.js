"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
// import swaggerJSDoc from 'swagger-jsdoc';
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("./docs/swagger.json"));
var contas_routes_1 = __importDefault(require("./routes/contas.routes"));
var middleError_1 = __importDefault(require("./middlewares/middleError"));
var ativos_routes_1 = __importDefault(require("./routes/ativos.routes"));
var investimentos_routes_1 = __importDefault(require("./routes/investimentos.routes"));
var validateToken_1 = __importDefault(require("./middlewares/validateToken"));
// import swaggerConfig from './docs/swagger.config';
// Problema na validação: https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use('/contas', contas_routes_1.default);
app.use('/ativos', validateToken_1.default, ativos_routes_1.default);
app.use('/investimentos', validateToken_1.default, investimentos_routes_1.default);
// Aqui vai o middle de erro para qualquer problema;
app.use(middleError_1.default);
exports.default = app;
