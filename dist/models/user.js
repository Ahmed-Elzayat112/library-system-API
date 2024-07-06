"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let User = class User extends sequelize_typescript_1.Model {
    static hashPassword(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (instance.changed("password")) {
                if (typeof instance.password === "string") {
                    instance.password = yield bcryptjs_1.default.hash(instance.password, 12);
                }
                else {
                    throw new Error("Password must be a string");
                }
            }
        });
    }
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.password === "string") {
                return yield bcryptjs_1.default.compare(password.toString(), this.password.toString());
            }
            return false;
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    sequelize_typescript_1.BeforeSave,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        timestamps: true,
    })
], User);
exports.default = User;
