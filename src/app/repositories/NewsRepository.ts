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
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        createdAt: true,
        author: { select: { name: true, id: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return await prisma.news.findFirst({ where: { id: id } });
  }

  async findByName(title: string) {
    return await prisma.news.findMany({
      where: { title: { contains: title } },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string) {
    return await prisma.news.delete({ where: { id: id } });
  }
}

export default new NewsRepository();
