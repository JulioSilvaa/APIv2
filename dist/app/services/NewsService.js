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
const NewsRepository_1 = __importDefault(require("../repositories/NewsRepository"));
class NewsService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield NewsRepository_1.default.findAll();
            if (posts.length === 0) {
                throw new Error("Posts list is empty");
            }
            return posts;
        });
    }
    create({ slug, title, content, author }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!content || !title || !content) {
                throw new Error("Fill in all required fields");
            }
            const news = yield NewsRepository_1.default.create({ slug, title, content, author });
            return news;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error("id is required");
            const post = yield NewsRepository_1.default.findById(id);
            return post;
        });
    }
    delete(id, author) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error(" id is required");
            const post = yield NewsRepository_1.default.findById(id);
            if (!post)
                throw new Error("Post not found");
            if (post.authorId !== author) {
                throw new Error("Post author not found");
            }
            const postDeleted = yield NewsRepository_1.default.delete(id);
            return postDeleted;
        });
    }
}
exports.default = new NewsService();
