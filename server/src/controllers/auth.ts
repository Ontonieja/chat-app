import { NextFunction, Request, RequestHandler, Response } from "express";
import db from "../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../middlewares/isAuth";

const maxAge = 3 * 24 * 60 * 60 * 1000;
export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const isExistingUser = await db.user.findFirst({
    where: { email },
  });

  const hashedPw = bcrypt.hashSync(password, 12);

  if (isExistingUser) {
    return res.status(400).json({ message: `Email is already in use` });
  }

  try {
    const user = await db.user.create({
      data: {
        email,
        password: hashedPw,
      },
    });
    console.log("user created:", user);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: maxAge },
    );

    res.cookie("jwt", token, {
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      message: "User created:",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await db.user.findFirst({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Wrong password or email" });
  }
  res.cookie("jwt", token, {
    maxAge,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.status(200).json({
    message: "Logged in successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};

export const getUserInfo = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const userId = req.user?.userId;

  if (!userId) {
    return res
      .status(404)
      .json({ message: "User with the given id not found" });
  }
  const userIdNumber = Number(userId);

  const user = await db.user.findFirst({
    where: { id: userIdNumber },
  });

  if (!user) {
    return res
      .status(404)
      .json({ message: "User with the given id not found" });
  }

  res.status(200).json({
    id: userIdNumber,
    email: user.email,
    name: user.name,
    profileSetup: user.profileSetup,
  });
};