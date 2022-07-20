"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ativo = /** @class */ (function () {
    function Ativo(_nome, _valor, _qtde, _codAtivo) {
        this._nome = _nome;
        this._valor = _valor;
        this._qtde = _qtde;
        this._codAtivo = _codAtivo;
    }
    Object.defineProperty(Ativo.prototype, "codAtivo", {
        get: function () {
            return this._codAtivo;
        },
        set: function (value) {
            this._codAtivo = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ativo.prototype, "qtde", {
        get: function () {
            return this._qtde;
        },
        set: function (value) {
            this._qtde = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ativo.prototype, "valor", {
        get: function () {
            return this._valor;
        },
        set: function (value) {
            this._valor = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ativo.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (value) {
            this._nome = value;
        },
        enumerable: false,
        configurable: true
    });
    return Ativo;
}());
exports.default = Ativo;
