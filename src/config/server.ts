import cors from "cors";
import { config } from "dotenv";
import express, { Application } from "express";
import "express-async-errors";

config();
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

export default app;
