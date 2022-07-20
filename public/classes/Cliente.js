"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente = /** @class */ (function () {
    function Cliente(_nome, _saldo, _codCliente, _ativos, _senha) {
        this._nome = _nome;
        this._saldo = _saldo;
        this._codCliente = _codCliente;
        this._ativos = _ativos;
        this._senha = _senha;
    }
    Object.defineProperty(Cliente.prototype, "codCliente", {
        get: function () {
            return this._codCliente;
        },
        set: function (value) {
            this._codCliente = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (value) {
            this._nome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        set: function (value) {
            this._saldo = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "ativos", {
        get: function () {
            return this._ativos;
        },
        set: function (value) {
            this._ativos = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "senha", {
        get: function () {
            return this._senha;
        },
        set: function (value) {
            this._senha = value;
        },
        enumerable: false,
        configurable: true
    });
    return Cliente;
}());
exports.default = Cliente;
