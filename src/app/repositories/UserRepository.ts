import { IUser } from "../../protocols/interfaces";
import { prisma } from "./prisma/client";

class UserRepository {
  async findAll(limit: number, per_page: number) {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          posts: {
            select: {
              title: true,
              slug: true,
              content: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: limit,
        take: per_page,
      }),
      prisma.user.count(),
    ]);
    const totalPages = Math.ceil(total / per_page);
    return {
      total,
      totalPages,
      users,
    };
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  async create({ name, password, email, username, avatarUrl }: IUser) {
    return await prisma.user.create({
      data: { avatarUrl, password, name, username, email },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await prisma.user.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
      orderBy: { createdAt: "desc" },
      select: {
        email: false,
        id: true,
        name: true,
        createdAt: true,
        _count: true,
      },
    });
  }

  async update({ id, name, password, email }: IUser) {
    return await prisma.user.update({
      where: { id },
      data: { name, password, email },
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({ where: { id } });
  }
}

export default new UserRepository();
