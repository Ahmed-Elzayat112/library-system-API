"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const router = (0, express_1.Router)();
router.get("/", isAuth_1.default, bookController_1.getBooks);
router.post("/", isAuth_1.default, isAdmin_1.default, bookController_1.createBook);
exports.default = router;
