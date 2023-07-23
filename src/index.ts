import { NextFunction, Request, Response } from "express";
import app from "./config/server";
import NewsRouter from "./routes/NewsRouter";
import UserRouter from "./routes/UserRouter";

const port = process.env.PORT || 3000;

app.use("/api/v2/user", UserRouter);
app.use("/api/v2/news", NewsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => console.log("listening on port: " + port));
