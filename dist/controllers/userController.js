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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = exports.protectedRoute = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, isAdmin } = req.body;
        const user = yield user_1.default.create({ username, password, isAdmin });
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_1.default.findOne({ where: { username } });
        if (!user || !(yield user.validatePassword(password))) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET || "your_jwt_secret", {
            expiresIn: "1h",
        });
        res.json({ token: "Bearer " + token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login user" });
    }
});
exports.login = login;
const protectedRoute = (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
};
exports.protectedRoute = protectedRoute;
const adminRoute = (req, res) => {
    res.json({ message: "This is an admin route", user: req.user });
};
exports.adminRoute = adminRoute;
