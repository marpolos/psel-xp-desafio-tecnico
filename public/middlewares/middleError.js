"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
var HttpException = /** @class */ (function (_super) {
    __extends(HttpException, _super);
    function HttpException(status, message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = status;
        return _this;
    }
    return HttpException;
}(Error));
exports.HttpException = HttpException;
exports.default = (function (err, _req, res, next) {
    var _a = err, statusCode = _a.statusCode, message = _a.message;
    res.status(statusCode || 500).json({ message: message });
    next();
});
