import bcrypt from "bcryptjs";
import storageClient from "../../config/supabase";
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

  async create({ name, password, email, username, avatarUrl }: IUser) {
    if (!name || !password || !email) {
      throw new Error("Fill in all required fields");
    }

    const userExists = await UserRepository.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
    const imageSize = avatarUrl.buffer.length;

    if (imageSize > MAX_IMAGE_SIZE) {
      throw new Error(
        `Imagem ${avatarUrl.originalname} excede o tamanho máximo permitido.`
      );
    }

    const { data } = await storageClient
      .from("teste")
      .upload(`/${name}/Avatar/_${avatarUrl.originalname}`, avatarUrl.buffer, {
        cacheControl: "3600",
        upsert: true,
      });

    const imageUrl = await storageClient
      .from("teste")
      .getPublicUrl(data?.path as any);

    const numberOfSalt = 12;
    const passwordHash = await bcrypt.hash(password, numberOfSalt);
    const user = await UserRepository.create({
      name,
      email,
      password: passwordHash,
      username,
      avatarUrl: imageUrl.data.publicUrl,
    });
    return user;
  }

  async show(id: string) {
    const user = await UserRepository.findById(id);
    return user;
  }

  async update({
    id,
    name,
    password,
    email,
    userId,
    username,
    avatarUrl,
  }: IUser) {
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

    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
    const imageSizeBytes = avatarUrl.buffer.length;
    console.log(avatarUrl, "URL");

    if (imageSizeBytes > MAX_IMAGE_SIZE) {
      throw new Error(
        `Imagem ${avatarUrl.originalname} excede o tamanho máximo permitido.`
      );
    }

    const { data } = await storageClient
      .from("teste")
      .upload(
        `/${name}/Avatar/_${avatarUrl?.originalname}`,
        avatarUrl?.buffer,
        {
          cacheControl: "3600",
        }
      );

    const imageUrl = await storageClient
      .from("teste")
      .getPublicUrl(data?.path as any);
    const newUrl = imageUrl?.data?.publicUrl;

    const updated = await UserRepository.update({
      id,
      name,
      password,
      email,
      username,
      avatarUrl: newUrl,
    });
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
    const FindUser = await UserRepository.findByEmail(email);
    if (!FindUser) {
      throw new Error("User or password incorrect");
    }

    const passwordIsValid = await bcrypt.compare(password, FindUser.password);
    if (!passwordIsValid) {
      throw new Error("User or password incorrect");
    }
    const user = {
      id: FindUser.id,
      avatarUrl: FindUser.avatarUrl,
      username: FindUser.username,
      name: FindUser.name,
      createdAt: FindUser.createdAt,
    };

    const token = generateAccessToken(user.id);
    return { token, user };
  }
}

export default new UserService();
