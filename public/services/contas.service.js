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
var contas_model_1 = __importDefault(require("../models/contas.model"));
var connection_1 = __importDefault(require("../db/connection"));
var ContaService = /** @class */ (function () {
    function ContaService() {
        this.model = new contas_model_1.default(connection_1.default);
    }
    ContaService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.getAll()];
                    case 1:
                        contas = _a.sent();
                        if (!contas.length)
                            return [2 /*return*/, { statusCode: 204, message: 'Nenhuma conta encontrada' }];
                        return [2 /*return*/, {
                                statusCode: 200,
                                data: contas,
                            }];
                }
            });
        });
    };
    ContaService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.getById(id)];
                    case 1:
                        conta = _a.sent();
                        // Não existe possibilidade de dar erro aqui porque deu throw na model.
                        if (!conta)
                            return [2 /*return*/, { statusCode: 404, message: 'Conta não encontrada' }];
                        return [2 /*return*/, {
                                statusCode: 200,
                                data: conta,
                            }];
                }
            });
        });
    };
    ContaService.prototype.atualizarConta = function (id, saldo, type) {
        return __awaiter(this, void 0, void 0, function () {
            var cliente;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.atualizarConta(Number(id), Number(saldo), type)];
                    case 1:
                        cliente = _a.sent();
                        // status 409 indica conflito
                        // Nunca entrará no erro porque o throw é lançado na model.
                        if (!cliente)
                            return [2 /*return*/, { statusCode: 409, message: 'Problema ao atualizar saldo' }];
                        return [2 /*return*/, {
                                statusCode: 200,
                                data: cliente,
                            }];
                }
            });
        });
    };
    ContaService.prototype.createConta = function (cliente) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.createConta(cliente)];
                    case 1:
                        token = _a.sent();
                        // 409 porque houve algum conflito na criação da conta
                        // Provavelmente nunca entrará aqui porque o model sempre retorna o mesmo.
                        if (!token)
                            return [2 /*return*/, { statusCode: 409, message: 'Problema ao criar conta' }];
                        return [2 /*return*/, {
                                statusCode: 201,
                                data: token,
                            }];
                }
            });
        });
    };
    ContaService.prototype.loginConta = function (cliente) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.loginConta(cliente)];
                    case 1:
                        token = _a.sent();
                        if (!token)
                            return [2 /*return*/, { statusCode: 404, message: 'Conta não encontrada' }];
                        return [2 /*return*/, {
                                statusCode: 200,
                                data: token,
                            }];
                }
            });
        });
    };
    return ContaService;
}());
exports.default = new ContaService();
