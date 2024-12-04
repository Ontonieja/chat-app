import { NextFunction, Request, RequestHandler, Response } from "express";
import db from "../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../middlewares/isAuth";

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

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: maxAge },
    );

    res.cookie("jwt", token, {
      maxAge,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      message: "User created:",
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
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
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.status(200).json({
    message: "Logged in successfully",
    user: {
      id: user.id,
      email: user.email,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      profileSetup: user.profileSetup,
      avatar: user.avatar,
    },
  });
};

export const getUserInfo = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const userId = req.userId;
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
    id: user.id,
    email: user.email,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    profileSetup: user.profileSetup,
    avatar: user.avatar,
  });
};

export const updateUserProfile = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const userId = req.userId;
  const { userName, firstName, lastName, avatar } = req.body;

  if (!userName || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const userIdNum = Number(userId);
  try {
    const updatedUser = await db.user.update({
      where: { id: userIdNum },
      data: {
        userName,
        firstName,
        lastName,
        profileSetup: true,
        avatar: avatar,
      },
    });
    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        id: updatedUser.id,
        userName: updatedUser.userName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        profileSetup: updatedUser.profileSetup,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};
