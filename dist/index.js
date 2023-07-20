"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NewsRouter_1 = __importDefault(require("./routes/NewsRouter"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const server_1 = __importDefault(require("./server/server"));
const port = process.env.PORT || 3000;
server_1.default.use("/user", UserRouter_1.default);
server_1.default.use("/post", NewsRouter_1.default);
server_1.default.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
});
server_1.default.listen(port, () => console.log("listening on port: " + port));
