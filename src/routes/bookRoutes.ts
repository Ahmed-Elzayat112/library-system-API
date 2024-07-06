import { Router } from "express";

import { getBooks, createBook } from "../controllers/bookController";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";

const router = Router();

router.get("/", isAuth, getBooks);
router.post("/", isAuth, isAdmin, createBook);

export default router;
