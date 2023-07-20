import { IUser } from "../protocols/interfaces";
import { prisma } from "./prisma/client";

class UserRepository {
  async findAll() {
    return await prisma.user.findMany({});
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create({ name, password, email }: IUser) {
    return await prisma.user.create({ data: { name, password, email } });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
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
