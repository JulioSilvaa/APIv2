import { NextFunction, Request, Response } from "express";
import NewsService from "../services/NewsService";

class NewsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.params.limit;
      const per_page = req.params.per_page;
      const posts = await NewsService.index(limit, per_page);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const author = req.user_id;
      const { slug, title, content } = req.body;
      const image = req.files;
      const news = await NewsService.create({
        slug,
        title,
        content,
        author,
        image,
      });
      return res.status(201).json(news);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = await NewsService.show(id);
      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async showParams(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.query;
      const post = await NewsService.showByName(title);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const author = req.user_id;
      const image = req.files;
      const { slug, title, content } = req.body;
      const post = await NewsService.update({
        id,
        slug,
        title,
        content,
        author,
        image,
      });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const author = req.user_id;
      const deletedPost = await NewsService.delete(id, author);
      return res.status(200).json(deletedPost);
    } catch (error) {
      next(error);
    }
  }
}

export default new NewsController();
