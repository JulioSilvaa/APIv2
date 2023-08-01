import bcrypt from "bcryptjs";
import { IUser } from "../../protocols/interfaces";
import { generateAccessToken } from "../../utils/generateToken";
import UserRepository from "../repositories/UserRepository";

class UserService {
  async index(limit: any, per_page: any) {
    const _limit = Number(limit) || 0;
    const _per_page = Number(per_page) || 5;

    const userList = await UserRepository.findAll(_limit, _per_page);
    if (userList.users.length === 0) {
      throw new Error("Users not found");
    }
    return userList;
  }

  async create({ name, password, email }: IUser) {
    if (!name || !password || !email) {
      throw new Error("Fill in all required fields");
    }

    const userExists = await UserRepository.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const numberOfSalt = 12;
    const passwordHash = await bcrypt.hash(password, numberOfSalt);
    const user = await UserRepository.create({
      name,
      email,
      password: passwordHash,
    });
    return user;
  }

  async show(id: string) {
    const user = await UserRepository.findById(id);
    return user;
  }

  async update({ id, name, password, email, userId }: IUser) {
    if (!id) {
      throw new Error("Id is required");
    }
    const findUser = await UserRepository.findById(id);
    if (!findUser) {
      throw new Error("User not found");
    }

    if (findUser.id !== id) {
      throw new Error("Id is not a valid");
    }

    if (findUser.id !== userId) {
      throw new Error("User is not authorized");
    }

    const updated = await UserRepository.update({ id, name, password, email });
    return updated;
  }

  async search(name: any) {
    if (!name) {
      throw new Error("user is required");
    }

    const user = await UserRepository.findByName(name);
    return user;
  }

  async delete(id: string, userId: string) {
    if (!id) {
      throw new Error("Id is required");
    }
    const findUser = await UserRepository.findById(id);

    if (!findUser) {
      throw new Error("User not found");
    }

    if (findUser.id !== id) {
      throw new Error("Id is not a valid");
    }

    if (findUser.id !== userId) {
      throw new Error("User is not authorized");
    }

    const deletedUser = await UserRepository.delete(id);
    return deletedUser;
  }

  async auth(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User or password incorrect");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error("User or password incorrect");
    }

    const token = generateAccessToken(user);
    return { token };
  }
}

export default new UserService();
