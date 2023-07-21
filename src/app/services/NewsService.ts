import { INews } from "../../protocols/interfaces";
import NewsRepository from "../repositories/NewsRepository";

class NewsService {
  async index() {
    const posts = await NewsRepository.findAll();

    if (posts.length === 0) {
      throw new Error("Posts list is empty");
    }
    return posts;
  }

  async create({ slug, title, content, author }: INews) {
    if (!content || !title || !content) {
      throw new Error("Fill in all required fields");
    }

    const news = await NewsRepository.create({
      slug,
      title,
      content,
      author,
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

  async update({ id, slug, title, content, author }: INews) {
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

    const newPost = await NewsRepository.update({
      id,
      slug,
      title,
      content,
      author,
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
