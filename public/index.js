"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
var PORT = process.env.PORT;
var server = app_1.default.listen(PORT, function () {
    console.log("Server running in " + PORT);
});
exports.default = server;
