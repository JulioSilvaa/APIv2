import { Router } from "express";
import NewsController from "../app/controllers/Newscontroller";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

const router = Router();

router.post("/post", AuthMiddleware.auth, NewsController.store);

export default router;
