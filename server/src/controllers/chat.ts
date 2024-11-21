import { Response } from "express";
import { RequestWithUser } from "../../middlewares/isAuth";
import db from "../../prisma/db";

export const getMessages = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const { userId } = req;

  if (!userId) return res.status(404).json({ message: "User not found" });

  try {
    const messages = await db.message.findMany({
      where: {
        OR: [{ senderId: userId }, { recipentId: userId }],
      },
    });

    if (!messages || !messages.length)
      return res.status(404).json({ message: "Messages not found" });
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};
