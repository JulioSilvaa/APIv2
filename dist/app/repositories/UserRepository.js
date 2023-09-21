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
class UserRepository {
    findAll(limit, per_page) {
        return __awaiter(this, void 0, void 0, function* () {
            const [users, total] = yield client_1.prisma.$transaction([
                client_1.prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                        posts: {
                            select: {
                                title: true,
                                slug: true,
                                content: true,
                                newsUrl: true,
                                id: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                            orderBy: {
                                createdAt: "desc",
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    skip: limit,
                    take: per_page,
                }),
                client_1.prisma.user.count(),
            ]);
            const totalPages = Math.ceil(total / per_page);
            return {
                total,
                totalPages,
                users,
            };
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.findFirst({ where: { email } });
        });
    }
    create({ name, password, email, username, avatarUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.create({
                data: { avatarUrl, password, name, username, email },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.findUnique({ where: { id } });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.findMany({
                where: { name: { contains: name, mode: "insensitive" } },
                orderBy: { createdAt: "desc" },
                select: {
                    email: false,
                    id: true,
                    name: true,
                    createdAt: true,
                    _count: true,
                },
            });
        });
    }
    update({ id, name, email, username, avatarUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.update({
                where: { id },
                data: { name, email, username, avatarUrl },
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.delete({ where: { id } });
        });
    }
}
exports.default = new UserRepository();
