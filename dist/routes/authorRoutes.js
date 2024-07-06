"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorController_1 = require("../controllers/authorController");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const router = (0, express_1.Router)();
router.get("/", isAuth_1.default, authorController_1.getAllAuthors);
router.post("/", isAuth_1.default, isAdmin_1.default, authorController_1.createAuthor);
exports.default = router;
