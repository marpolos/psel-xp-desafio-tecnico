"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ativos_model_1 = __importDefault(require("./ativos.model"));
var contas_model_1 = __importDefault(require("./contas.model"));
var middleError_1 = require("../middlewares/middleError");
var InvestimentoModel = /** @class */ (function () {
    function InvestimentoModel(conn) {
        this.connection = conn;
        this.ativosModel = new ativos_model_1.default(conn);
        this.contaModel = new contas_model_1.default(conn);
    }
    // método para facilitar a busca de matches cliente - ativo
    InvestimentoModel.prototype.matchAtivoCliente = function (codCliente, codAtivo) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT * FROM cliente_ativo WHERE id_cliente = ? AND id_ativo = ?;';
                        return [4 /*yield*/, this.connection.execute(query, [codCliente, codAtivo])];
                    case 1:
                        rows = (_a.sent())[0];
                        match = rows[0];
                        return [2 /*return*/, match];
                }
            });
        });
    };
    InvestimentoModel.prototype.criarMatch = function (codCliente, codAtivo, qtde, valorAtivo) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, dataInserted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'INSERT INTO cliente_ativo (id_cliente, id_ativo, qtde, valor_ativo) VALUES (?, ?, ?, ?);';
                        return [4 /*yield*/, this.connection
                                .execute(query, [codCliente, codAtivo, qtde, valorAtivo])];
                    case 1:
                        result = _a.sent();
                        dataInserted = result[0];
                        // 409 conflit
                        if (dataInserted.affectedRows === 0)
                            throw new middleError_1.HttpException(409, 'Erro ao atualizar relação do cliente com ativo.');
                        return [2 /*return*/, {
                                codCliente: codCliente,
                                codAtivo: codAtivo,
                                qtde: qtde,
                                valorAtivo: valorAtivo,
                            }];
                }
            });
        });
    };
    // método para atualizar o match de ativo com cliente
    InvestimentoModel.prototype.atualizarMatch = function (codCliente, codAtivo, qtde) {
        return __awaiter(this, void 0, void 0, function () {
            var query, upRelation, newRelation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE cliente_ativo SET qtde = ?, updated = ? WHERE id_cliente = ? AND id_ativo = ?;';
                        return [4 /*yield*/, this.connection
                                .execute(query, [qtde, new Date(), codCliente, codAtivo])];
                    case 1:
                        upRelation = (_a.sent())[0];
                        if (upRelation.affectedRows === 0)
                            throw new middleError_1.HttpException(409, 'Erro ao atualizar match.');
                        return [4 /*yield*/, this.matchAtivoCliente(codCliente, codAtivo)];
                    case 2:
                        newRelation = _a.sent();
                        return [2 /*return*/, newRelation];
                }
            });
        });
    };
    InvestimentoModel.prototype.venderAtivo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var codAtivo, codCliente, qtde, isMatch, qtdeCliente, deposito, newRelation, codCli, codAt, newQ, valorAtivo, dataTratado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        codAtivo = data.codAtivo, codCliente = data.codCliente, qtde = data.qtde;
                        return [4 /*yield*/, this.matchAtivoCliente(codCliente, codAtivo)];
                    case 1:
                        isMatch = _a.sent();
                        if (!isMatch)
                            throw new middleError_1.HttpException(409, 'Cliente não relacionado ao ativo.');
                        qtdeCliente = Number(isMatch.qtde) >= qtde;
                        if (!qtdeCliente)
                            throw new middleError_1.HttpException(409, 'Cliente não tem a quantidade de ativo para vender.');
                        // Terceiro, atualizar relação cliente-ativo
                        return [4 /*yield*/, this.atualizarMatch(codCliente, codAtivo, Number(isMatch.qtde) - qtde)];
                    case 2:
                        // Terceiro, atualizar relação cliente-ativo
                        _a.sent();
                        // Quarto, atualizar o ativo
                        return [4 /*yield*/, this.ativosModel.atualizarAtivo(codAtivo, qtde, 'vender')];
                    case 3:
                        // Quarto, atualizar o ativo
                        _a.sent();
                        deposito = qtde * Number(isMatch.valor_ativo);
                        return [4 /*yield*/, this.contaModel.atualizarConta(codCliente, deposito, 'depositar')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.matchAtivoCliente(codCliente, codAtivo)];
                    case 5:
                        newRelation = _a.sent();
                        codCli = newRelation.id_cliente, codAt = newRelation.id_ativo, newQ = newRelation.qtde, valorAtivo = newRelation.valor_ativo;
                        dataTratado = {
                            codCliente: codCli,
                            codAtivo: codAt,
                            qtde: newQ,
                            valorAtivo: valorAtivo,
                        };
                        return [2 /*return*/, dataTratado];
                }
            });
        });
    };
    InvestimentoModel.prototype.comprarAtivo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var codAtivo, codCliente, qtde, ativo, qtdeAtivo, saldoCliente, saldo, saque, isMatch, newRelation, codCli, codAt, newQ, valorAtivo, dataTratado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        codAtivo = data.codAtivo, codCliente = data.codCliente, qtde = data.qtde;
                        return [4 /*yield*/, this.ativosModel.getById(codAtivo)];
                    case 1:
                        ativo = _a.sent();
                        if (!ativo)
                            throw new middleError_1.HttpException(404, 'Ativo não encontrado.');
                        qtdeAtivo = Number(ativo.qtde);
                        if (qtde > qtdeAtivo)
                            throw new middleError_1.HttpException(409, 'Quantidade de ativo maior que a disponível.');
                        return [4 /*yield*/, this.contaModel.getById(codCliente)];
                    case 2:
                        saldoCliente = _a.sent();
                        console.log('verifica cliente', saldoCliente);
                        if (!saldoCliente)
                            throw new middleError_1.HttpException(404, 'Cliente não encontrado.');
                        saldo = Number(saldoCliente.saldo);
                        if (saldo < qtde * Number(ativo.valor))
                            throw new middleError_1.HttpException(409, 'Cliente não tem saldo para comprar o ativo.');
                        saque = qtde * Number(ativo.valor);
                        return [4 /*yield*/, this.contaModel.atualizarConta(codCliente, saque, 'sacar')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.matchAtivoCliente(codCliente, codAtivo)];
                    case 4:
                        isMatch = _a.sent();
                        if (!isMatch) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.atualizarMatch(codCliente, codAtivo, Number(isMatch.qtde) + qtde)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.criarMatch(codCliente, codAtivo, qtde, ativo.valor)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: 
                    // Sexto, atualiza a tabela de ativo
                    return [4 /*yield*/, this.ativosModel.atualizarAtivo(codAtivo, qtde, 'comprar')];
                    case 9:
                        // Sexto, atualiza a tabela de ativo
                        _a.sent();
                        return [4 /*yield*/, this.matchAtivoCliente(codCliente, codAtivo)];
                    case 10:
                        newRelation = _a.sent();
                        codCli = newRelation.id_cliente, codAt = newRelation.id_ativo, newQ = newRelation.qtde, valorAtivo = newRelation.valor_ativo;
                        dataTratado = {
                            codCliente: codCli,
                            codAtivo: codAt,
                            qtde: newQ,
                            valorAtivo: valorAtivo,
                        };
                        return [2 /*return*/, dataTratado];
                }
            });
        });
    };
    InvestimentoModel.prototype.listaInvestimentos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, lista;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT * FROM cliente_ativo';
                        return [4 /*yield*/, this.connection.execute(query)];
                    case 1:
                        rows = (_a.sent())[0];
                        lista = Object.values(rows).map(function (row) {
                            var codCliente = row.id_cliente, codAtivo = row.id_ativo, qtde = row.qtde, valorAtivo = row.valor_ativo;
                            return {
                                codCliente: codCliente,
                                codAtivo: codAtivo,
                                qtde: qtde,
                                valorAtivo: valorAtivo,
                            };
                        });
                        return [2 /*return*/, lista];
                }
            });
        });
    };
    return InvestimentoModel;
}());
exports.default = InvestimentoModel;
