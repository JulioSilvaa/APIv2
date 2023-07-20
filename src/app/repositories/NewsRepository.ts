import { INews } from "../../protocols/interfaces";
import { prisma } from "./prisma/client";

class NewsRepository {
  async create({ slug, title, content, author }: INews) {
    return await prisma.news.create({
      data: { slug, title, content, authorId: author },
    });
  }

  async findAll() {
    return await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return await prisma.news.findFirst({ where: { id: id } });
  }

  async delete(id: string) {
    return await prisma.news.delete({ where: { id: id } });
  }
}

export default new NewsRepository();
