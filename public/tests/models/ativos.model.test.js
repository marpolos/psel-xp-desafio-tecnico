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
var ativos_model_1 = __importDefault(require("../../models/ativos.model"));
var mocks_1 = require("../mocks");
describe('Testa o model dos ativos', function () {
    var model = new ativos_model_1.default(connection_1.default);
    /* beforeAll(() => {
      model = new AtivosModel(connection);
    }); */
    describe('Método getAll', function () {
        it('Verifica se retorna um array de ativos', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getAll()];
                    case 1:
                        result = _a.sent();
                        expect(typeof result).toBe('object');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método getById', function () {
        it('Quando passa um id válido retorna um objeto com id, qtde, valor, nome', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('id');
                        expect(response).toHaveProperty('nome');
                        expect(response).toHaveProperty('valor');
                        expect(response).toHaveProperty('qtde');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Quando envia um id inválido lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(model.getById(mocks_1.ID_INVALID)).rejects.toEqual(new middleError_1.HttpException(404, 'Ativo não encontrado.'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método getByIdCliente', function () {
        it('Ao enviar um id de um cliente que tenha ativos retorna um array de ativos', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getByIdCliente(mocks_1.ID)];
                    case 1:
                        result = _a.sent();
                        expect(typeof result).toBe('object');
                        expect(result[0]).toHaveProperty('valorAtivo');
                        expect(result[0]).toHaveProperty('codAtivo');
                        expect(result[0]).toHaveProperty('codCliente');
                        expect(result[0]).toHaveProperty('qtde');
                        return [2 /*return*/];
                }
            });
        }); });
        it('Ao enviar o id de um cliente sem ativos lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getByIdCliente(mocks_1.ID_INVALID)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método atualizarAtivo', function () {
        it('Se a quantidade a ser comprada for maior que a disponível, lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(model.atualizarAtivo(mocks_1.ID, mocks_1.QTDE * 1000, mocks_1.COMPRAR)).rejects.toEqual(new middleError_1.HttpException(409, 'Erro ao atualizar ativo por conta da quantidade.'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se a quantidade a ser comprada do ativo pelo cliente estiver disponível, então retorna uma quantidade final menor do ativo', function () { return __awaiter(void 0, void 0, void 0, function () {
            var qtde, afterAtivo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 1:
                        qtde = (_a.sent()).qtde;
                        return [4 /*yield*/, model.atualizarAtivo(mocks_1.ID, mocks_1.QTDE, mocks_1.COMPRAR)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 3:
                        afterAtivo = _a.sent();
                        expect(Number(qtde)).toBeGreaterThan(Number(afterAtivo.qtde));
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se o cliente estiver vendendo o ativo, retorna uma quantidade maior de ativos', function () { return __awaiter(void 0, void 0, void 0, function () {
            var qtde, afterAtivo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 1:
                        qtde = (_a.sent()).qtde;
                        return [4 /*yield*/, model.atualizarAtivo(mocks_1.ID, mocks_1.QTDE, mocks_1.VENDER)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, model.getById(mocks_1.ID)];
                    case 3:
                        afterAtivo = _a.sent();
                        expect(Number(qtde)).toBeLessThan(Number(afterAtivo.qtde));
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
