"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NewController_1 = __importDefault(require("../app/controllers/NewController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
const LIMIT_IMAGE = 3;
router.get("/", NewController_1.default.index);
router.get("/search", NewController_1.default.showParams);
router.get("/:id", NewController_1.default.show);
router.patch("/:id", AuthMiddleware_1.default.auth, multer_1.default.array("file", LIMIT_IMAGE), NewController_1.default.update);
router.delete("/:id", AuthMiddleware_1.default.auth, NewController_1.default.delete);
router.post("/", AuthMiddleware_1.default.auth, multer_1.default.array("file", LIMIT_IMAGE), NewController_1.default.store);
exports.default = router;
