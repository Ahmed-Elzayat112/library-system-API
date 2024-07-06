import { Router } from "express";
import { getAllAuthors, createAuthor } from "../controllers/authorController";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";

const router = Router();

router.get("/", isAuth, getAllAuthors);
router.post("/", isAuth, isAdmin, createAuthor);

export default router;
