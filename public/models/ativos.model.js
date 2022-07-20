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
var AtivosModel = /** @class */ (function () {
    function AtivosModel(conn) {
        this.connection = conn;
    }
    AtivosModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, ativos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT * FROM ativo';
                        return [4 /*yield*/, this.connection.execute(query)];
                    case 1:
                        ativos = (_a.sent())[0];
                        return [2 /*return*/, ativos];
                }
            });
        });
    };
    AtivosModel.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, ativo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT * FROM ativo WHERE id = ?';
                        return [4 /*yield*/, this.connection.execute(query, [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        ativo = rows[0];
                        return [2 /*return*/, ativo];
                }
            });
        });
    };
    AtivosModel.prototype.getByIdCliente = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, ativos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'SELECT * FROM cliente_ativo WHERE id_cliente = ?';
                        return [4 /*yield*/, this.connection.execute(query, [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        ativos = Object.values(rows).map(function (row) {
                            var codCliente = row.id_cliente, codAtivo = row.id_ativo, qtde = row.qtde, valorAtivo = row.valor_ativo;
                            return {
                                codCliente: codCliente,
                                codAtivo: codAtivo,
                                qtde: qtde,
                                valorAtivo: valorAtivo,
                            };
                        });
                        return [2 /*return*/, ativos];
                }
            });
        });
    };
    AtivosModel.prototype.atualizarAtivo = function (id, qtde, type) {
        return __awaiter(this, void 0, void 0, function () {
            var query, ativo, qtdeAtivoDB, upAtivo, newAtivo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = 'UPDATE ativo SET qtde=? WHERE id=?';
                        return [4 /*yield*/, this.getById(id)];
                    case 1:
                        ativo = _a.sent();
                        if (!ativo)
                            return [2 /*return*/, {}];
                        qtdeAtivoDB = Number(ativo.qtde);
                        if (qtdeAtivoDB - qtde < 0)
                            return [2 /*return*/, {}];
                        return [4 /*yield*/, this.connection
                                .execute(query, [type === 'vender' ? qtdeAtivoDB + qtde : qtdeAtivoDB - qtde, id])];
                    case 2:
                        upAtivo = (_a.sent())[0];
                        if (upAtivo.affectedRows === 0)
                            return [2 /*return*/, {}];
                        return [4 /*yield*/, this.getById(id)];
                    case 3:
                        newAtivo = _a.sent();
                        return [2 /*return*/, newAtivo];
                }
            });
        });
    };
    return AtivosModel;
}());
exports.default = AtivosModel;
