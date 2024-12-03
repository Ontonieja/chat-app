import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface RequestWithUser extends Request {
  userId?: number;
}
export default async function isAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ message: "No token provided" });
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId as number;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
}
