import storageClient from "../../config/supabase";
import { INews } from "../../protocols/interfaces";
import NewsRepository from "../repositories/NewsRepository";
import UserRepository from "../repositories/UserRepository";

class NewsService {
  async index(limit: any, per_page: any) {
    const _limit = Number(limit) || 0;
    const _per_page = Number(per_page) || 10;

    const posts = await NewsRepository.findAll(_limit, _per_page);

    if (posts.news.length === 0) {
      throw new Error("Posts list is empty");
    }
    return posts;
  }

  async create({ slug, title, content, author, image }: INews) {
    if (!content || !title || !content) {
      throw new Error("Fill in all required fields");
    }

    const findAuthorByName = await UserRepository.findById(author);
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
    const imageUrls = [];

    for (const imageFile of image) {
      const imageSizeBytes = imageFile.buffer.length;

      if (imageSizeBytes > MAX_IMAGE_SIZE) {
        throw new Error(
          `Imagem ${imageFile.originalname} excede o tamanho máximo permitido.`
        );
      }

      const { data } = await storageClient
        .from("teste")
        .upload(
          `/${findAuthorByName?.name}/Images/${title}/${Date.now()}_${
            imageFile.originalname
          }`,
          imageFile.buffer,
          { cacheControl: "3600", upsert: true }
        );

      const imageUrl = await storageClient
        .from("teste")
        .getPublicUrl(data?.path as any);
      imageUrls.push(imageUrl.data.publicUrl);
    }

    const news = await NewsRepository.create({
      slug,
      title,
      content,
      author,
      imageUrl: imageUrls,
    });

    return news;
  }

  async show(id: string) {
    if (!id) throw new Error("id is required");
    const post = await NewsRepository.findById(id);
    return post;
  }

  async showByName(title: any) {
    if (!title) throw new Error("title is required");

    const post = await NewsRepository.findByName(title);

    if (post.length === 0) {
      throw new Error("Posts list is not found");
    }
    return post;
  }

  async update({ id, slug, title, content, author, image }: INews) {
    if (!id) {
      throw new Error("id is required");
    }

    const post = await NewsRepository.findById(id);

    if (!post) {
      throw new Error("post is not found");
    }

    if (post.authorId !== author) {
      throw new Error("author is not authorized");
    }

    const findAuthorByName = await UserRepository.findById(author);
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
    const imageUrls = [];

    for (const imageFile of image) {
      const imageSizeBytes = imageFile.buffer.length;

      if (imageSizeBytes > MAX_IMAGE_SIZE) {
        throw new Error(
          `Imagem ${imageFile.originalname} excede o tamanho máximo permitido.`
        );
      }

      const { data } = await storageClient
        .from("teste")
        .upload(
          `/${findAuthorByName?.name}/Images/${title}/_${imageFile.originalname}`,
          imageFile.buffer,
          { cacheControl: "3600", upsert: true }
        );

      const imageUrl = await storageClient
        .from("teste")
        .getPublicUrl(data?.path as any);
      imageUrls.push(imageUrl?.data.publicUrl);
    }

    const newPost = await NewsRepository.update({
      id,
      slug,
      title,
      content,
      author,
      image: imageUrls,
    });

    return newPost;
  }

  async delete(id: string, author: string) {
    if (!id) throw new Error(" id is required");

    const post = await NewsRepository.findById(id);
    if (!post) throw new Error("Post not found");

    if (post.authorId !== author) {
      throw new Error("Post author not found");
    }

    const postDeleted = await NewsRepository.delete(id);
    return postDeleted;
  }
}

export default new NewsService();
