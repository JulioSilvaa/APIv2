import { IUser } from "../../protocols/interfaces";
import { prisma } from "./prisma/client";

class UserRepository {
  async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
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
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  async create({ name, password, email }: IUser) {
    return await prisma.user.create({ data: { name, password, email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await prisma.user.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
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
