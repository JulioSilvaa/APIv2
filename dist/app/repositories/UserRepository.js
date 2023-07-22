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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    posts: {
                        select: {
                            title: true,
                            slug: true,
                            content: true,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.findFirst({ where: { email } });
        });
    }
    create({ name, password, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.create({ data: { name, password, email } });
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
            });
        });
    }
    update({ id, name, password, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.prisma.user.update({
                where: { id },
                data: { name, password, email },
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
