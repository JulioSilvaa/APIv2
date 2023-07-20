import { INews } from "../protocols/interfaces";
import { prisma } from "./prisma/client";

class NewsRepository {
  async create({ slug, title, content }: INews) {
    return await prisma.news.create({ data: { slug, title, content } });
  }
}

export default new NewsRepository();
