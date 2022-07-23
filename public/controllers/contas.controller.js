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
var contas_service_1 = __importDefault(require("../services/contas.service"));
/* class ContaController {
  constructor(public _contaService = new ContaService()) {}

  public async getAll(_req: Request, res: Response) {
    console.log('service', this._contaService);
    console.log('entrei aqui');
    const teste = new ContaService();
    console.log('teste', teste);
    const data = await this._contaService.getAll();
    return res.status(200).json(data);
  }
}

// Aqui vou exportar instanciada para título de estudo.

export default new ContaController(); */
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, statusCode, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, contas_service_1.default.getAll()];
            case 1:
                _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                return [2 /*return*/, res.status(statusCode).json(data)];
        }
    });
}); };
var getById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, statusCode, data, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, contas_service_1.default.getById(Number(id))];
            case 1:
                _a = _b.sent(), statusCode = _a.statusCode, data = _a.data, message = _a.message;
                if (message) {
                    return [2 /*return*/, next({
                            statusCode: statusCode,
                            message: message,
                        })];
                }
                return [2 /*return*/, res.status(statusCode).json(data)];
        }
    });
}); };
var atualizarConta = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var type, _a, codCliente, saldo, _b, statusCode, data, message;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                type = req.url === '/saque' ? 'sacar' : 'depositar';
                _a = req.body, codCliente = _a.codCliente, saldo = _a.saldo;
                return [4 /*yield*/, contas_service_1.default
                        .atualizarConta(Number(codCliente), Number(saldo), type)];
            case 1:
                _b = _c.sent(), statusCode = _b.statusCode, data = _b.data, message = _b.message;
                if (message) {
                    return [2 /*return*/, next({
                            statusCode: statusCode,
                            message: message,
                        })];
                }
                return [2 /*return*/, res.status(statusCode).json(data)];
        }
    });
}); };
var createConta = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, statusCode, data, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, contas_service_1.default.createConta(req.body)];
            case 1:
                _a = _b.sent(), statusCode = _a.statusCode, data = _a.data, message = _a.message;
                if (message) {
                    return [2 /*return*/, next({
                            statusCode: statusCode,
                            message: message,
                        })];
                }
                return [2 /*return*/, res.status(statusCode).json({ token: data })];
        }
    });
}); };
var loginConta = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, statusCode, data, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, contas_service_1.default.loginConta(req.body)];
            case 1:
                _a = _b.sent(), statusCode = _a.statusCode, data = _a.data, message = _a.message;
                if (message) {
                    return [2 /*return*/, next({
                            statusCode: statusCode,
                            message: message,
                        })];
                }
                return [2 /*return*/, res.status(statusCode).json({ token: data })];
        }
    });
}); };
exports.default = {
    getAll: getAll,
    getById: getById,
    atualizarConta: atualizarConta,
    createConta: createConta,
    loginConta: loginConta,
};
