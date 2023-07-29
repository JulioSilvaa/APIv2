"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NewsController_1 = __importDefault(require("../app/controllers/NewsController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.get("/", NewsController_1.default.index);
router.get("/search", NewsController_1.default.showParams);
router.get("/:id", NewsController_1.default.show);
router.patch("/:id", AuthMiddleware_1.default.auth, NewsController_1.default.update);
router.delete("/:id", AuthMiddleware_1.default.auth, NewsController_1.default.delete);
router.post("/", multer_1.default.single("file"), AuthMiddleware_1.default.auth, NewsController_1.default.store);
exports.default = router;
