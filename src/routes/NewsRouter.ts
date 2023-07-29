import { Router } from "express";
import NewsController from "../app/controllers/Newscontroller";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

import upload from "../config/multer";

const router = Router();

router.get("/", NewsController.index);
router.get("/search", NewsController.showParams);
router.get("/:id", NewsController.show);
router.patch("/:id", AuthMiddleware.auth, NewsController.update);
router.delete("/:id", AuthMiddleware.auth, NewsController.delete);
router.post(
  "/",
  upload.single("file"),
  AuthMiddleware.auth,
  NewsController.store
);

export default router;
