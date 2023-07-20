import { Router } from "express";
import NewsController from "../app/controllers/Newscontroller";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

const router = Router();

router.get("/", NewsController.index);
router.get("/:id", NewsController.show);
router.delete("/:id", AuthMiddleware.auth, NewsController.delete);
router.post("/", AuthMiddleware.auth, NewsController.store);

export default router;
