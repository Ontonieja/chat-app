import { Request, Response } from "express";
import db from "../../prisma/db";
import { RequestWithUser } from "../../middlewares/isAuth";

export const findContacts = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const { searchValue } = req.body;
  const { userId } = req;

  if (!searchValue) return res.status(400).json({ message: "No search value" });

  if (!userId) return res.status(404).json({ message: "User not found" });

  try {
    const existingContacts = await db.contact.findMany({
      where: { userId },
      select: { contactId: true },
    });
    const excludedContactIds = existingContacts.map(
      (contact) => contact.contactId,
    );

    const users = await db.user.findMany({
      where: {
        id: { notIn: [userId, ...excludedContactIds] },
        OR: [
          { userName: { contains: searchValue, mode: "insensitive" } },
          { firstName: { contains: searchValue, mode: "insensitive" } },
          { lastName: { contains: searchValue, mode: "insensitive" } },
        ],
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return res.status(200).json(usersWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addContact = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const { userId } = req;

  const { contactId } = req.body;
  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const contact = await db.contact.create({
      data: { userId, contactId },
    });
    return res
      .status(200)
      .json({ message: "Contact added successfully", contact: contact });
  } catch (err) {
    return res.status(404).json({ message: "Somethinig went wrong", err });
  }
};

export const getContacts = async (
  req: RequestWithUser,
  res: Response,
): Promise<any> => {
  const { userId } = req;

  if (!userId) return res.status(404).json({ message: "User not found" });

  const contacts = await db.contact.findMany({
    where: { userId },
    select: {
      contact: {
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  });

  const flatContacts = contacts.map((entry) => entry.contact);

  return res.status(200).json(flatContacts);
};
