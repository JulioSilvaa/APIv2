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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./prisma/client");
class NewsRepository {
    create({ slug, title, content, author, imageUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.news.create({
                data: { slug, title, content, authorId: author, newsUrl: imageUrl },
            });
        });
    }
    findAll(limit, per_page) {
        return __awaiter(this, void 0, void 0, function* () {
            const [news, total] = yield client_1.prisma.$transaction([
                client_1.prisma.news.findMany({
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        newsUrl: true,
                        author: { select: { name: true, id: true, username: true } },
                        updatedAt: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    skip: limit,
                    take: per_page,
                }),
                client_1.prisma.news.count(),
            ]);
            const totalPages = Math.ceil(total / per_page);
            return {
                total,
                totalPages,
                news,
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.news.findFirst({ where: { id: id } });
        });
    }
    update({ id, slug, title, content, author, image }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.news.update({
                where: { id },
                data: { slug, title, content, authorId: author, newsUrl: image },
            });
        });
    }
    findByName(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.news.findMany({
                where: { title: { contains: title, mode: "insensitive" } },
                orderBy: {
                    createdAt: "desc",
                },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.news.delete({ where: { id: id } });
        });
    }
}
exports.default = new NewsRepository();
