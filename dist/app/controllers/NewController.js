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
const NewsService_1 = __importDefault(require("../services/NewsService"));
class NewsController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield NewsService_1.default.index();
                return res.status(200).json(posts);
            }
            catch (error) {
                next(error);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = req.user_id;
                const { slug, title, content } = req.body;
                const image = req.files;
                const news = yield NewsService_1.default.create({
                    slug,
                    title,
                    content,
                    author,
                    image,
                });
                return res.status(201).json(news);
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
                const post = yield NewsService_1.default.show(id);
                return res.status(200).json(post);
            }
            catch (error) {
                next(error);
            }
        });
    }
    showParams(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.query;
                const post = yield NewsService_1.default.showByName(title);
                res.status(200).json(post);
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
                const author = req.user_id;
                const { slug, title, content } = req.body;
                const post = yield NewsService_1.default.update({
                    id,
                    slug,
                    title,
                    content,
                    author,
                });
                res.status(200).json(post);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const author = req.user_id;
                const deletedPost = yield NewsService_1.default.delete(id, author);
                return res.status(200).json(deletedPost);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new NewsController();
