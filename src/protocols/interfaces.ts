export interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  passwordHash?: string;
}

export interface INews {
  slug: string;
  title: string;
  content: string;
  author: string;
}
