import jwt from "jsonwebtoken";

export function generateAccessToken(id: string) {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("Access token failed");
  }
  return jwt.sign({ userId: id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: id,
  });
}

export function generateRefreshToken(sub: any) {
  if (!process.env.JWT_ACCESS_SECRET) throw new Error("Refresh token failed");
  return jwt.sign({ userId: sub }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
    subject: sub,
  });
}
