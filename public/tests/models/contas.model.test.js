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
var connection_1 = __importDefault(require("../../db/connection"));
var middleError_1 = require("../../middlewares/middleError");
var contas_model_1 = __importDefault(require("../../models/contas.model"));
var mocks_1 = require("../mocks");
describe.skip('Testa o model das contas', function () {
    var model;
    beforeAll(function () {
        model = new contas_model_1.default(connection_1.default);
    });
    describe('Método getAll', function () {
        test('Verifica se retorna um array de Clientes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getAll()];
                    case 1:
                        response = _a.sent();
                        expect(typeof response).toBe('object');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método getById', function () {
        test('Quando passa um id válido retorna um objeto com id, nome e saldo', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('id');
                        expect(response).toHaveProperty('nome');
                        expect(response).toHaveProperty('saldo');
                        return [2 /*return*/];
                }
            });
        }); });
        test('Quando passa um id inválido retorna um objeto vazio', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID_INVALID)];
                    case 1:
                        response = _a.sent();
                        console.log('response/contas/model/getById', response);
                        expect(response).not.toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método atualizarConta', function () {
        test('Ao enviar um id inválido lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(model.atualizarConta(mocks_1.ID_INVALID, mocks_1.SALDO, mocks_1.SACAR)).rejects.toEqual(new middleError_1.HttpException(404, 'Cliente não encontrado'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('Ao enviar saldo maior que valor na conta lança um erro - para saques', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(model.atualizarConta(mocks_1.ID, mocks_1.SUPER_SALDO, mocks_1.SACAR)).rejects.toThrowError()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test('Ao enviar um id, saldo e "sacar" retira um valor da conta', function () { return __awaiter(void 0, void 0, void 0, function () {
            var saldo, newSaldo, afterSaque;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 1:
                        saldo = (_a.sent()).saldo;
                        return [4 /*yield*/, model.atualizarConta(mocks_1.ID, mocks_1.SALDO, mocks_1.SACAR)];
                    case 2:
                        _a.sent();
                        newSaldo = Number(saldo) - mocks_1.SALDO;
                        return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 3:
                        afterSaque = _a.sent();
                        expect(Number(afterSaque.saldo)).toBe(newSaldo);
                        return [2 /*return*/];
                }
            });
        }); });
        test('Ao enviar id, saldo e "depositar" soma valor na conta', function () { return __awaiter(void 0, void 0, void 0, function () {
            var saldo, newSaldo, afterSaque;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 1:
                        saldo = (_a.sent()).saldo;
                        return [4 /*yield*/, model.atualizarConta(mocks_1.ID, mocks_1.SALDO, mocks_1.DEPOSITAR)];
                    case 2:
                        _a.sent();
                        newSaldo = Number(saldo) + mocks_1.SALDO;
                        return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 3:
                        afterSaque = _a.sent();
                        expect(Number(afterSaque.saldo)).toBe(newSaldo);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método createConta', function () {
        it('Retorna um token quando cria uma conta', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.createConta(mocks_1.NEW_CLIENTE)];
                    case 1:
                        token = _a.sent();
                        expect(token.length).toBeGreaterThan(mocks_1.LENGTH_TOKEN);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Lança um erro se a conta já existe', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(model.createConta(mocks_1.NEW_CLIENTE)).rejects.toThrowError()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método loginConta', function () {
        it('Retorna um token se o cliente existe', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.loginConta(mocks_1.NEW_CLIENTE)];
                    case 1:
                        token = _a.sent();
                        expect(token.length).toBeGreaterThan(mocks_1.LENGTH_TOKEN);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se tenta logar com cliente inexistente gera um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(model.loginConta(mocks_1.NOT_CLIENTE)).rejects.toThrowError()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
