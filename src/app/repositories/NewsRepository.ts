import { INews } from "../../protocols/interfaces";
import { prisma } from "./prisma/client";

class NewsRepository {
  async create({ slug, title, content, author, imageUrl }: INews) {
    return await prisma.news.create({
      data: { slug, title, content, authorId: author, newsUrl: imageUrl },
    });
  }

  async findAll(limit: number, per_page: number) {
    const [news, total] = await prisma.$transaction([
      prisma.news.findMany({
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
          createdAt: true,
          newsUrl: true,
          author: { select: { name: true, id: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: limit,
        take: per_page,
      }),
      prisma.news.count(),
    ]);
    const totalPages = Math.ceil(total / per_page);
    return {
      total,
      totalPages,
      news,
    };
  }

  async findById(id: string) {
    return await prisma.news.findFirst({ where: { id: id } });
  }

  async update({ id, slug, title, content, author, image }: INews) {
    return await prisma.news.update({
      where: { id },
      data: { slug, title, content, authorId: author, newsUrl: image },
    });
  }

  async findByName(title: string) {
    return await prisma.news.findMany({
      where: { title: { contains: title, mode: "insensitive" } },
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
