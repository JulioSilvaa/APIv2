import { Router } from "express";
import NewsController from "../app/controllers/NewsController";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

const router = Router();

router.get("/", NewsController.index);
router.get("/search", NewsController.showParams);
router.get("/:id", NewsController.show);
router.patch("/:id", AuthMiddleware.auth, NewsController.update);
router.delete("/:id", AuthMiddleware.auth, NewsController.delete);
router.post("/", AuthMiddleware.auth, NewsController.store);

export default router;
