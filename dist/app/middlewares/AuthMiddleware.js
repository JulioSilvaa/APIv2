"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    auth(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.send(401);
        }
        const [, token] = authHeader.split(" ");
        if (!token) {
            return res.send(401);
        }
        if (process.env.JWT_ACCESS_SECRET)
            try {
                const { sub } = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
                req.user_id = sub;
                next();
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
    }
}
exports.default = new AuthMiddleware();
