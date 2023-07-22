import { Router } from "express";
import NewController from "../app/controllers/NewsController";
import AuthMiddleware from "../app/middlewares/AuthMiddleware";

const router = Router();

router.get("/", NewController.index);
router.get("/search", NewController.showParams);
router.get("/:id", NewController.show);
router.patch("/:id", AuthMiddleware.auth, NewController.update);
router.delete("/:id", AuthMiddleware.auth, NewController.delete);
router.post("/", AuthMiddleware.auth, NewController.store);

export default router;
