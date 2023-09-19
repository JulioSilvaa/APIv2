import { Router } from "express";
import UserController from "../app/controllers/UserController";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";
import upload from "../config/multer";

const router = Router();

router.get("/", UserController.index);
router.get("/search", UserController.search);
router.get("/:id", UserController.show);
router.post("/register", upload.single("file"), UserController.create);
router.post("/auth", UserController.auth);
router.patch(
  "/:id",
  upload.single("file"),
  AuthMiddleware.auth,
  UserController.update
);
router.delete("/:id", AuthMiddleware.auth, UserController.delete);

export default router;
