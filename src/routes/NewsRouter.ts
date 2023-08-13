import { Router } from "express";
import NewsController from "../app/controllers/NewController";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

import upload from "../config/multer";

const router = Router();
const LIMIT_IMAGE = 3;

router.get("/", NewsController.index);
router.get("/search", NewsController.showParams);
router.get("/:id", NewsController.show);
router.patch(
  "/:id",
  AuthMiddleware.auth,
  upload.array("file", LIMIT_IMAGE),
  NewsController.update
);
router.delete("/:id", AuthMiddleware.auth, NewsController.delete);
router.post(
  "/",
  AuthMiddleware.auth,
  upload.array("file", LIMIT_IMAGE),
  NewsController.store
);

export default router;
