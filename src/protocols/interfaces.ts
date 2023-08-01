export interface IUser {
  id?: string;
  userId?: string;
  name: string;
  password: string;
  email: string;
  passwordHash?: string;
  username: string;
  avatarUrl: any;
}

export interface INews {
  id?: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  image?: any;
  imageUrl?: any;
}
