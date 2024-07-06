import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admins only" });
    }
};

export default isAdmin;
