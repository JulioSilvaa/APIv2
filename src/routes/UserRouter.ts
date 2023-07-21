import { Router } from "express";
import UserController from "../app/controllers/UserController";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

const router = Router();

router.get("/", UserController.index);
router.get("/search", UserController.search);
router.get("/:id", UserController.show);
router.post("/register", UserController.create);
router.post("/auth", UserController.auth);
router.patch("/:id", AuthMiddleware.auth, UserController.update);
router.delete("/:id", AuthMiddleware.auth, UserController.delete);

export default router;
