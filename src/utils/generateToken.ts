import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export function generateAccessToken(user: User) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: user.id,
  });
}

export function generateRefreshToken(sub: any) {
  if (!process.env.JWT_ACCESS_SECRET) throw new Error("Refresh token failed");
  return jwt.sign({ userId: sub }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: sub,
  });
}
