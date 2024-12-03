import { addContact, findContacts, getContacts } from "../controllers/contacts";
import { RequestWithUser } from "../middlewares/isAuth";
import db from "../../prisma/db";
import { mockResponse } from "./mock";
import { Request, Response } from "express";

jest.mock("../../prisma/db", () => ({
  user: {
    findMany: jest.fn(),
  },
  contact: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Contacts controller", () => {
  let req: RequestWithUser;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {},
      userId: 1,
    } as RequestWithUser;
    res = mockResponse();
  });

  describe("findContacts", () => {
    it("should return 400 if no search value is provided", async () => {
      const req = { body: { searchValue: "" } } as RequestWithUser;
      await findContacts(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "No search value" });
    });

    it("should return 404 if userId is not provided", async () => {
      req.userId = undefined;
      req.body.searchValue = "John";
      await findContacts(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return matching users when found", async () => {
      req.body.searchValue = "John";
      (db.contact.findMany as jest.Mock).mockResolvedValue([{ contactId: 2 }]);
      (db.user.findMany as jest.Mock).mockResolvedValue([
        {
          id: 3,
          userName: "JohnDoe",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          avatar: "/avatars/john.png",
          profileSetup: true,
        },
      ]);

      await findContacts(req, res);

      expect(db.contact.findMany).toHaveBeenCalledWith({
        where: { userId: req.userId },
        select: { contactId: true },
      });
      expect(db.user.findMany).toHaveBeenCalledWith({
        where: {
          id: { notIn: [req.userId, 2] },
          OR: [
            { userName: { contains: "John", mode: "insensitive" } },
            { firstName: { contains: "John", mode: "insensitive" } },
            { lastName: { contains: "John", mode: "insensitive" } },
          ],
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 3,
          userName: "JohnDoe",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          avatar: "/avatars/john.png",
          profileSetup: true,
        },
      ]);
    });

    it("should return 404 if no users are found", async () => {
      req.body.searchValue = "NonExistentUser";
      (db.contact.findMany as jest.Mock).mockResolvedValue([]);
      (db.user.findMany as jest.Mock).mockResolvedValue([]);
      await findContacts(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe("addContact", () => {
    it("should add contact to user", async () => {
      const req = { userId: 1, body: { contactId: 2 } } as RequestWithUser;
      const res = mockResponse();

      (db.contact.create as jest.Mock).mockResolvedValue({
        id: 1,
        userId: req.userId,
        contactId: req.body.contactId,
      });

      await addContact(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Contact added successfully",
        contact: { id: 1, userId: req.userId, contactId: req.body.contactId },
        contact2: { id: 1, userId: req.userId, contactId: req.body.contactId },
      });
    });

    it("should return 404 if userId is not provided", async () => {
      req.userId = undefined;
      const res = mockResponse();
      await addContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe("getContacts", () => {
    it("Should return all contacts of a user", async () => {
      (db.contact.findMany as jest.Mock).mockResolvedValue([
        {
          contact: {
            id: 2,
            userName: "JohnDoe",
            firstName: "John",
            lastName: "Doe",
            avatar: "/avatars/johndoe.png",
          },
        },
        {
          contact: {
            id: 3,
            userName: "JaneDoe",
            firstName: "Jane",
            lastName: "Doe",
            avatar: "/avatars/janedoe.png",
          },
        },
      ]);

      await getContacts(req as RequestWithUser, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          id: 2,
          userName: "JohnDoe",
          firstName: "John",
          lastName: "Doe",
          avatar: "/avatars/johndoe.png",
        },
        {
          id: 3,
          userName: "JaneDoe",
          firstName: "Jane",
          lastName: "Doe",
          avatar: "/avatars/janedoe.png",
        },
      ]);
    });

    it("should return 404 if userId is not provided", async () => {
      req.userId = undefined;
      await getContacts(req as RequestWithUser, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return an empty array if the user has no contacts", async () => {
      (db.contact.findMany as jest.Mock).mockResolvedValue([]);
      await getContacts(req as RequestWithUser, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
