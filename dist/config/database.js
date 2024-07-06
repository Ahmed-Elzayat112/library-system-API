"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config();
console.log((0, path_1.join)(__dirname, "..", "models.*.{ts,js}"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    logging: false,
    models: [(0, path_1.join)(__dirname, "..", "models", "*.{ts,js}")],
});
// sequelize.addModels([Author, Book, User]);
exports.default = sequelize;
