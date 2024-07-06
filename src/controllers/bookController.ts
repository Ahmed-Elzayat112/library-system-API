import { Response, Request } from "express";

import Book from "../models/book";
import { paginate } from "../util/pagination";

export const getBooks = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        const books = await paginate(Book, {}, { page, pageSize });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve books" });
    }
};

export const createBook = async (req: Request, res: Response) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: "Failed to create book" });
    }
};
