"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.params.limit;
                const per_page = req.params.per_page;
                const user = yield UserService_1.default.index(limit, per_page);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, username } = req.body;
                const avatarUrl = req === null || req === void 0 ? void 0 : req.file;
                const user = yield UserService_1.default.create({
                    name,
                    email,
                    password,
                    username,
                    avatarUrl,
                });
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield UserService_1.default.show(id);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                const user = yield UserService_1.default.search(name);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user_id;
                const avatarUrl = req === null || req === void 0 ? void 0 : req.file;
                const { name, email, password, username } = req.body;
                const user = yield UserService_1.default.update({
                    id,
                    name,
                    email,
                    password,
                    username,
                    avatarUrl,
                    userId,
                });
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user_id;
                const { id } = req.params;
                const user = yield UserService_1.default.delete(id, userId);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userAuth = yield UserService_1.default.auth(email, password);
                res.status(200).json(userAuth);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
