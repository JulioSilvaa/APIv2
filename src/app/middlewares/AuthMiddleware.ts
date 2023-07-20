import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
}

class AuthMiddleware {
  auth(req: Request, res: Response, next: NextFunction) {
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
        const { sub } = jwt.verify(
          token,
          process.env.JWT_ACCESS_SECRET
        ) as IPayload;

        req.user_id = sub;

        next();
      } catch (error) {
        return res.status(500).json({ message: error });
      }
  }
}

export default new AuthMiddleware();
