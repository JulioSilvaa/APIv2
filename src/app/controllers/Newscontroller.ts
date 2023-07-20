import { NextFunction, Request, Response } from "express";
import NewsService from "../services/NewsService";

class NewsController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { author } = req.user_id;
      const { slug, title, content } = req.body;
      const news = await NewsService.create({ slug, title, content });
    } catch (error) {
      next(error);
    }
  }
}

export default new NewsController();
