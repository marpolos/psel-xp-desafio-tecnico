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
var middleError_1 = require("../../middlewares/middleError");
var contas_service_1 = __importDefault(require("../../services/contas.service"));
var mocks_1 = require("../mocks");
describe.skip('Testa o service das contas', function () {
    describe('Método getAll', function () {
        it('Retorna status 200 e um data de array', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.getAll()];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).toHaveProperty('data');
                        expect(response).not.toHaveProperty('message');
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método getById', function () {
        it('Se a conta existe retorna status 200 e um data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.getById(mocks_1.ID)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).toHaveProperty('data');
                        expect(response).not.toHaveProperty('message');
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se a conta não existe retorna status 404 e uma message', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.getById(mocks_1.ID_INVALID)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).not.toHaveProperty('data');
                        expect(response).toHaveProperty('message');
                        expect(response.statusCode).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método atualizarConta', function () {
        it('Se atualiza com sucesso retorna status 200 e um data - sacar', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.atualizarConta(mocks_1.ID, mocks_1.SALDO, mocks_1.SACAR)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).toHaveProperty('data');
                        expect(response).not.toHaveProperty('message');
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se atualiza com sucesso retorna status 200 e um data - depositar', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.atualizarConta(mocks_1.ID, mocks_1.SALDO, mocks_1.DEPOSITAR)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).toHaveProperty('data');
                        expect(response).not.toHaveProperty('message');
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se o id não existe retorna um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(contas_service_1.default.atualizarConta(mocks_1.ID_INVALID, mocks_1.SALDO, mocks_1.SACAR)).rejects.toEqual(new middleError_1.HttpException(404, 'Cliente não encontrado'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se o valor para saque for maior que o na conta lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(contas_service_1.default.atualizarConta(mocks_1.ID, mocks_1.SUPER_SALDO, mocks_1.SACAR)).rejects.toEqual(new middleError_1.HttpException(400, 'Saldo insuficiente'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método createConta', function () {
        it('Ao criar um usuário com sucesso retorna status 201', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.createConta(mocks_1.NEW_CLIENTE)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).toHaveProperty('data');
                        expect(response).not.toHaveProperty('message');
                        expect(response.statusCode).toBe(201);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Ao enviar um usuário que já existe retorna status 409 e message', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.createConta(mocks_1.NEW_CLIENTE)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).not.toHaveProperty('data');
                        expect(response).toHaveProperty('message');
                        expect(response.statusCode).toBe(409);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método loginConta', function () {
        it('Se realiza login com sucesso retorna status 200', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contas_service_1.default.loginConta(mocks_1.NEW_CLIENTE)];
                    case 1:
                        response = _a.sent();
                        expect(response).toHaveProperty('statusCode');
                        expect(response).toHaveProperty('data');
                        expect(response).not.toHaveProperty('message');
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se há erro no login retorna status 404', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(contas_service_1.default.loginConta(mocks_1.NOT_CLIENTE)).rejects.toThrowError()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
