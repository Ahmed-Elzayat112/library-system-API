import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, isAdmin } = req.body;
        const user = await User.create({ username, password, isAdmin });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.validatePassword(password))) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || "your_jwt_secret",
            {
                expiresIn: "1h",
            }
        );
        res.json({ token: "Bearer " + token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to login user" });
    }
};

export const protectedRoute = (req: Request, res: Response) => {
    res.json({ message: "This is a protected route", user: req.user });
};

export const adminRoute = (req: Request, res: Response) => {
    res.json({ message: "This is an admin route", user: req.user });
};
