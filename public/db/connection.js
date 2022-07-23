"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var promise_1 = __importDefault(require("mysql2/promise"));
dotenv_1.default.config();
var NODE_ENV = process.env.NODE_ENV;
var conn;
if (NODE_ENV === 'test') {
    conn = {
        host: process.env.TEST_DB_HOST,
        user: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DATABASE,
        port: 3306,
    };
}
else {
    conn = {
        host: process.env.DB_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: 3306,
    };
}
exports.default = promise_1.default.createPool(conn);
