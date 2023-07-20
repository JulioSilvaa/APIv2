import { Router } from "express";
import UserController from "../app/controllers/UserController";

const router = Router();

router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.post("/", UserController.create);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
