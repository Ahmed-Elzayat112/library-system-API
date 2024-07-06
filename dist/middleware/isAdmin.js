"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: "Forbidden: Admins only" });
    }
};
exports.default = isAdmin;
