import { INews } from "../protocols/interfaces";
import NewsRepository from "../repositories/NewsRepository";

class NewsService {
  async create({ slug, title, content }: INews) {
    if (!content || !title || !content) {
      throw new Error("Fill in all required fields");
    }

    const news = await NewsRepository.create({ slug, title, content });
    return news;
  }
}

export default new NewsService();
