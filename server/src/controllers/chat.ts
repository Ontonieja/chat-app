import { Response } from "express";
import { RequestWithUser } from "../middlewares/isAuth";
import db from "../../prisma/db";
import { uploadToS3 } from "../services/s3";

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

export const uploadFile = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const { userId, file } = req;
  const { recipentId } = req.body;

  console.log("hehe");

  if (!file || !userId)
    return res.status(404).json({ message: "File or user not provided" });

  try {
    const s3UploadResponse = await uploadToS3({ file, userId });
    const { fileUrl } = s3UploadResponse;

    const savedFile = await db.message.create({
      data: {
        senderId: userId,
        recipentId: Number(recipentId),
        message: fileUrl,
        type: "FILE",
        sentAt: new Date(),
        isRead: false,
      },
    });
    return res.status(200).json(savedFile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", err });
  }
};

export const setMessagesRead = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const { userId } = req;
  const { senderId } = req.body;

  if (!userId || !senderId)
    return res.status(404).json({ message: "User not found" });

  try {
    const result = await db.message.updateMany({
      where: {
        AND: [{ senderId: senderId }, { recipentId: userId }],
      },
      data: {
        isRead: true,
      },
    });
    return res
      .status(200)
      .json({ message: `${result.count} messages updated` });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};
