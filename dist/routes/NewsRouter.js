"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Newscontroller_1 = __importDefault(require("../app/controllers/Newscontroller"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const router = (0, express_1.Router)();
router.get("/", Newscontroller_1.default.index);
router.get("/:id", Newscontroller_1.default.show);
router.delete("/:id", AuthMiddleware_1.default.auth, Newscontroller_1.default.delete);
router.post("/", AuthMiddleware_1.default.auth, Newscontroller_1.default.store);
exports.default = router;
