"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../app/controllers/UserController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.get("/", UserController_1.default.index);
router.get("/search", UserController_1.default.search);
router.get("/:id", UserController_1.default.show);
router.post("/register", multer_1.default.single("file"), UserController_1.default.create);
router.post("/auth", UserController_1.default.auth);
router.patch("/:id", multer_1.default.single("file"), AuthMiddleware_1.default.auth, UserController_1.default.update);
router.delete("/:id", AuthMiddleware_1.default.auth, UserController_1.default.delete);
exports.default = router;
