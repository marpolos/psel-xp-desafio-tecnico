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
Object.defineProperty(exports, "__esModule", { value: true });
var middleError_1 = require("../middlewares/middleError");
var jwt_1 = require("../utils/jwt");
// import { HttpException } from '../middlewares/middleError';
var ContaModel = /** @class */ (function () {
    function ContaModel(conn) {
        this.connection = conn;
    }
    ContaModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, clientes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT id, nome, saldo FROM cliente';
                        return [4 /*yield*/, this.connection.execute(query)];
                    case 1:
                        clientes = (_a.sent())[0];
                        return [2 /*return*/, clientes];
                }
            });
        });
    };
    ContaModel.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, cliente;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT id, nome, saldo FROM cliente WHERE id = ?';
                        return [4 /*yield*/, this.connection.execute(query, [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        cliente = rows[0];
                        if (!cliente)
                            throw new middleError_1.HttpException(404, 'Cliente não encontrado.');
                        // retorna um {} porque é um [[]]
                        // Decidi retirar os as Cliente para tratar tudo no service.
                        return [2 /*return*/, cliente];
                }
            });
        });
    };
    ContaModel.prototype.atualizarConta = function (id, saldo, type) {
        return __awaiter(this, void 0, void 0, function () {
            var query, cliente, saldoInDB, newSaldo, upConta, newConta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE cliente SET saldo=? WHERE id=?';
                        return [4 /*yield*/, this.getById(id)];
                    case 1:
                        cliente = _a.sent();
                        if (!cliente)
                            throw new middleError_1.HttpException(404, 'Cliente não encontrado');
                        saldoInDB = Number(cliente.saldo);
                        if (type === 'sacar' && saldoInDB < saldo)
                            throw new middleError_1.HttpException(400, 'Saldo insuficiente');
                        newSaldo = type === 'depositar' ? saldoInDB + saldo : saldoInDB - saldo;
                        return [4 /*yield*/, this.connection.execute(query, [newSaldo, id])];
                    case 2:
                        upConta = (_a.sent())[0];
                        if (upConta.affectedRows === 0)
                            throw new middleError_1.HttpException(409, 'Erro ao atualizar conta.');
                        return [4 /*yield*/, this.getById(id)];
                    case 3:
                        newConta = _a.sent();
                        return [2 /*return*/, newConta];
                }
            });
        });
    };
    ContaModel.prototype.createConta = function (cliente) {
        return __awaiter(this, void 0, void 0, function () {
            var query, nome, saldo, senha, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'INSERT INTO cliente (nome, saldo, senha) VALUES (?, ?, ?)';
                        nome = cliente.nome, saldo = cliente.saldo, senha = cliente.senha;
                        return [4 /*yield*/, this.connection.execute(query, [nome, saldo, senha])];
                    case 1:
                        _a.sent();
                        token = (0, jwt_1.generateToken)(cliente);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    ContaModel.prototype.loginConta = function (cliente) {
        return __awaiter(this, void 0, void 0, function () {
            var nome, senha, query, clienteExiste, find, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nome = cliente.nome, senha = cliente.senha;
                        query = 'SELECT * FROM cliente WHERE nome = ? AND senha = ?';
                        return [4 /*yield*/, this.connection.execute(query, [nome, senha])];
                    case 1:
                        clienteExiste = (_a.sent())[0];
                        find = clienteExiste[0];
                        // Aqui eu retorno false para dar erro se não encontrar o cliente;
                        if (!find)
                            throw new middleError_1.HttpException(404, 'Cliente não encontrado');
                        token = (0, jwt_1.generateToken)(find);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    return ContaModel;
}());
exports.default = ContaModel;
