import { Request, Response } from "express";
import { Author } from "../models/author";
import { Book } from "../models/book";

export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Author.findAll({ include: Book });
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve authors" });
    }
};

export const createAuthor = async (req: Request, res: Response) => {
    try {
        const newAuthor = await Author.create(req.body);
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json({ error: "Failed to create author" });
    }
};
