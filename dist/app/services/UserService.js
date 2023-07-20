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
const generateToken_1 = require("../../utils/generateToken");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
class UserService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const userList = yield UserRepository_1.default.findAll();
            if (userList.length === 0) {
                throw new Error("Users not found");
            }
            return userList;
        });
    }
    create({ name, password, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !password || !email) {
                throw new Error("Fill in all required fields");
            }
            const userExists = yield UserRepository_1.default.findByEmail(email);
            if (userExists) {
                throw new Error("User already exists");
            }
            const numberOfSalt = 12;
            const passwordHash = yield bcryptjs_1.default.hash(password, numberOfSalt);
            const user = yield UserRepository_1.default.create({
                name,
                email,
                password: passwordHash,
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
    update({ id, name, password, email }) {
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
            const updated = yield UserRepository_1.default.update({ id, name, password, email });
            return updated;
        });
    }
    delete(id) {
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
            const deletedUser = yield UserRepository_1.default.delete(id);
            return deletedUser;
        });
    }
    auth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.default.findByEmail(email);
            if (!user) {
                throw new Error("User or password incorrect");
            }
            const passwordIsValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!passwordIsValid) {
                throw new Error("User or password incorrect");
            }
            const token = (0, generateToken_1.generateAccessToken)(user);
            return { token };
        });
    }
}
exports.default = new UserService();
