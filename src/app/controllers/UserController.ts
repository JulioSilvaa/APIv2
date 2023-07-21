import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.index();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.create({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.show(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      const user = await UserService.search(name);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await UserService.update({ id, name, email, password });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userAuth = await UserService.auth(email, password);
      res.status(200).json(userAuth);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
