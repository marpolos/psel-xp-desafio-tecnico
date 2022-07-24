"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var contas_controller_1 = __importDefault(require("../../controllers/contas.controller"));
var middleError_1 = require("../../middlewares/middleError");
var mocks_1 = require("../mocks");
// Usei esse conteúdo para testar o controller:
// https://stackoverflow.com/questions/59235639/how-to-mock-response-from-service-for-testing-controller-in-typescript-using-jes
/* jest.mock('../../services/contas.service', () => {
  const serviceMock = {
    getAll: jest.fn(),
    getById: jest.fn(),
    atualizarConta: jest.fn(),
    createConta: jest.fn(),
    loginConta: jest.fn(),
  };
  return { contasService: jest.fn(() => serviceMock) };
}); */
describe.skip('Testa o controller das contas', function () {
    /* afterEach(() => {
      jest.resetAllMocks();
    }); */
    describe('Método getAll', function () {
        it('Retorna status 200 e um json no response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            query: {},
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = jest.fn();
                        return [4 /*yield*/, contas_controller_1.default
                                .getAll(mReq, mRes, mNext)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(200);
                        expect(mRes.json).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método getById', function () {
        it('Se envia um id válido retorna status 200 e um json no response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            query: {},
                            params: { id: mocks_1.ID },
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = function () { };
                        return [4 /*yield*/, contas_controller_1.default
                                .getById(mReq, mRes, mNext)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(200);
                        expect(mRes.json).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se envia um id inválido retorna status 404 e uma message de erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            query: {},
                            params: { id: mocks_1.ID_INVALID },
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = function () { };
                        return [4 /*yield*/, contas_controller_1.default
                                .getById(mReq, mRes, mNext)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(404);
                        expect(mRes.json).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método atualizarConta', function () {
        it('Se envia id e saldo válidos retorna status 200 e um json - saque', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            url: '/depositar',
                            body: __assign(__assign({}, mocks_1.contasMock[0]), { saldo: mocks_1.SALDO }),
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        return [4 /*yield*/, contas_controller_1.default
                                .atualizarConta(mReq, mRes)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(200);
                        expect(mRes.json).toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se envia um id inválido retorna status 404 e uma message', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            url: '/depositar',
                            body: { codCliente: mocks_1.ID_INVALID, saldo: mocks_1.SALDO },
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = jest.fn();
                        return [4 /*yield*/, expect(contas_controller_1.default
                                .atualizarConta(mReq, mRes)).rejects.toEqual(new middleError_1.HttpException(404, 'Cliente não encontrado.'))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se tenta sacar uma quantidade maior que a da conta lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            url: '/depositar',
                            body: { codCliente: mocks_1.ID, saldo: mocks_1.SUPER_SALDO },
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = jest.fn();
                        return [4 /*yield*/, expect(contas_controller_1.default
                                .atualizarConta(mReq, mRes)).rejects.toThrowError()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método createConta', function () {
        it('Se cria a conta com sucesso retorna status 201 e um json com a chave token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            body: mocks_1.NEW_CLIENTE,
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = jest.fn();
                        return [4 /*yield*/, contas_controller_1.default
                                .createConta(mReq, mRes, mNext)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(201);
                        expect(mRes.json.mock.lastCall[0].token).toBeDefined();
                        expect(mNext).not.toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Se não cria a conta, retorna status 409', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            body: mocks_1.NEW_CLIENTE,
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = jest.fn();
                        return [4 /*yield*/, contas_controller_1.default
                                .createConta(mReq, mRes, mNext)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(409);
                        expect(mRes.json.mock.lastCall[0].token).not.toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Método loginConta', function () {
        it('Se faz login de cadastro existente retorna status 200 e um json com a chave token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mReq, mRes, mNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mReq = {
                            body: mocks_1.NEW_CLIENTE,
                        };
                        mRes = {
                            status: jest.fn().mockReturnThis(),
                            json: jest.fn(),
                        };
                        mNext = jest.fn();
                        return [4 /*yield*/, contas_controller_1.default
                                .loginConta(mReq, mRes, mNext)];
                    case 1:
                        _a.sent();
                        expect(mRes.status).toBeCalledWith(200);
                        expect(mRes.json.mock.lastCall[0].token).toBeDefined();
                        expect(mNext).not.toBeCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('Se tenta logar com usuário inexistente lança um erro', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mReq, mRes, mNext;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mReq = {
                        body: mocks_1.NOT_CLIENTE,
                    };
                    mRes = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn(),
                    };
                    mNext = jest.fn();
                    return [4 /*yield*/, expect(contas_controller_1.default
                            .loginConta(mReq, mRes, mNext)).rejects.toThrowError()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
