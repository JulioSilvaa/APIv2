import { Router } from "express";
import UserController from "../app/controllers/UserController";

const router = Router();

router.get("/", UserController.index);
router.get("/search", UserController.search);
router.get("/:id", UserController.show);
router.post("/", UserController.create);
router.post("/auth", UserController.auth);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
