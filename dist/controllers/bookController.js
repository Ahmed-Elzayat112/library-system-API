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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getBooks = void 0;
const book_1 = require("../models/book");
const pagination_1 = require("../util/pagination");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const books = yield (0, pagination_1.paginate)(book_1.Book, {}, { page, pageSize });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve books" });
    }
});
exports.getBooks = getBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield book_1.Book.create(req.body);
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create book" });
    }
});
exports.createBook = createBook;
