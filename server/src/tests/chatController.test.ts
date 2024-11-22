import db from "../../prisma/db";
import { RequestWithUser } from "../../middlewares/isAuth";
import { Response } from "express";
import { getMessages } from "../controllers/chat";
import { mockResponse } from "./mock";
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../prisma/db", () => ({
  message: {
    findMany: jest.fn(),
  },
}));

describe("Chat Controller", () => {
  let req: RequestWithUser;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {},
      userId: 1,
    } as RequestWithUser;
    res = mockResponse();
  });
  describe("Get all user messages", () => {
    it("should return 404 if the userId is not provided", async () => {
      req.userId = undefined;
      await getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("Should get all messages of user", async () => {
      (db.message.findMany as jest.Mock).mockResolvedValue([
        { id: 1, senderId: 1, recipentId: 2, message: "Hello", type: "TEXT" },
        { id: 2, senderId: 3, recipentId: 1, message: "Hello", type: "TEXT" },
      ]);
      await getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, senderId: 1, recipentId: 2, message: "Hello", type: "TEXT" },
        { id: 2, senderId: 3, recipentId: 1, message: "Hello", type: "TEXT" },
      ]);
    });

    it("should return 404 if no messages are found", async () => {
      (db.message.findMany as jest.Mock).mockResolvedValue([]);

      await getMessages(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Messages not found" });
    });
  });
});
