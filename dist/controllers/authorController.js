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
exports.createAuthor = exports.getAllAuthors = void 0;
const author_1 = __importDefault(require("../models/author"));
const book_1 = __importDefault(require("../models/book"));
const getAllAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield author_1.default.findAll({ include: book_1.default });
        res.json(authors);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to retrieve authors" });
    }
});
exports.getAllAuthors = getAllAuthors;
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAuthor = yield author_1.default.create(req.body);
        res.status(201).json(newAuthor);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create author" });
    }
});
exports.createAuthor = createAuthor;
