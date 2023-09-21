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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const supabase_1 = __importDefault(require("../../config/supabase"));
const generateToken_1 = require("../../utils/generateToken");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class UserService {
    index(limit, per_page) {
        return __awaiter(this, void 0, void 0, function* () {
            const _limit = Number(limit) || 0;
            const _per_page = Number(per_page) || 5;
            const userList = yield UserRepository_1.default.findAll(_limit, _per_page);
            if (userList.users.length === 0) {
                throw new Error("Users not found");
            }
            return userList;
        });
    }
    create({ name, password, email, username, avatarUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !password || !email) {
                throw new Error("Fill in all required fields");
            }
            const userExists = yield UserRepository_1.default.findByEmail(email);
            if (userExists) {
                throw new Error("User already exists");
            }
            const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
            const imageSize = avatarUrl.buffer.length;
            if (imageSize > MAX_IMAGE_SIZE) {
                throw new Error(`Imagem ${avatarUrl.originalname} excede o tamanho máximo permitido.`);
            }
            const { data } = yield supabase_1.default
                .from("teste")
                .upload(`/${name}/Avatar/_${avatarUrl.originalname}`, avatarUrl.buffer, {
                cacheControl: "3600",
                upsert: true,
            });
            const imageUrl = yield supabase_1.default
                .from("teste")
                .getPublicUrl(data === null || data === void 0 ? void 0 : data.path);
            const numberOfSalt = 12;
            const passwordHash = yield bcryptjs_1.default.hash(password, numberOfSalt);
            const user = yield UserRepository_1.default.create({
                name,
                email,
                password: passwordHash,
                username,
                avatarUrl: imageUrl.data.publicUrl,
            });
            return user;
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findById(id);
            return user;
        });
    }
    update({ id, name, password, email, userId, username, avatarUrl, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Id is required");
            }
            const findUser = yield UserRepository_1.default.findById(id);
            if (!findUser) {
                throw new Error("User not found");
            }
            if (findUser.id !== id) {
                throw new Error("Id is not a valid");
            }
            if (findUser.id !== userId) {
                throw new Error("User is not authorized");
            }
            const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
            const imageSizeBytes = avatarUrl === null || avatarUrl === void 0 ? void 0 : avatarUrl.buffer.length;
            const pathUrl = `/${name}/Avatar/_${avatarUrl.originalname}`;
            if (imageSizeBytes > MAX_IMAGE_SIZE) {
                throw new Error(`Imagem ${avatarUrl.originalname} excede o tamanho máximo permitido.`);
            }
            const { data } = yield supabase_1.default
                .from("teste")
                .update(pathUrl, avatarUrl === null || avatarUrl === void 0 ? void 0 : avatarUrl.buffer, {
                cacheControl: "3600",
                upsert: true,
            });
            const imageUrl = yield supabase_1.default
                .from("teste")
                .getPublicUrl(data === null || data === void 0 ? void 0 : data.path);
            const updated = yield UserRepository_1.default.update({
                id,
                name,
                password,
                email,
                username,
                avatarUrl: imageUrl.data.publicUrl,
            });
            return updated;
        });
    }
    search(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new Error("user is required");
            }
            const user = yield UserRepository_1.default.findByName(name);
            return user;
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Id is required");
            }
            const findUser = yield UserRepository_1.default.findById(id);
            if (!findUser) {
                throw new Error("User not found");
            }
            if (findUser.id !== id) {
                throw new Error("Id is not a valid");
            }
            if (findUser.id !== userId) {
                throw new Error("User is not authorized");
            }
            const deletedUser = yield UserRepository_1.default.delete(id);
            return deletedUser;
        });
    }
    auth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const FindUser = yield UserRepository_1.default.findByEmail(email);
            if (!FindUser) {
                throw new Error("User or password incorrect");
            }
            const passwordIsValid = yield bcryptjs_1.default.compare(password, FindUser.password);
            if (!passwordIsValid) {
                throw new Error("User or password incorrect");
            }
            const user = {
                id: FindUser.id,
                avatarUrl: FindUser.avatarUrl,
                username: FindUser.username,
                name: FindUser.name,
                createdAt: FindUser.createdAt,
            };
            const token = (0, generateToken_1.generateAccessToken)(user.id);
            return { token, user };
        });
    }
}
exports.default = new UserService();
