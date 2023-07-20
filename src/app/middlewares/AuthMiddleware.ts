import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  sub: string;
}

class AuthMiddleware {
  auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401);
    }

    const [, token] = authHeader?.split(" ");

    if (!token) {
      res.status(401);
    }

    if (process.env.JWT_TOKEN) {
      const { sub } = jwt.verify(token, process.env.JWT_TOKEN) as IPayload;
      req.user_id = sub;

      try {
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    }
  }
}

export default new AuthMiddleware();
