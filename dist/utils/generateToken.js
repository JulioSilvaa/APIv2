"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(id) {
    if (!process.env.JWT_ACCESS_SECRET) {
        throw new Error("Access token failed");
    }
    return jsonwebtoken_1.default.sign({ userId: id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "7d",
        subject: id,
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(sub) {
    if (!process.env.JWT_ACCESS_SECRET)
        throw new Error("Refresh token failed");
    return jsonwebtoken_1.default.sign({ userId: sub }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "7d",
        subject: sub,
    });
}
exports.generateRefreshToken = generateRefreshToken;
