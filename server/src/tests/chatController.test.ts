import db from "../../prisma/db";
import { RequestWithUser } from "../../middlewares/isAuth";
import { Response } from "express";
import { getMessages, uploadFile } from "../controllers/chat";
import { mockResponse } from "./mock";
import { uploadToS3 } from "../services/s3";
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../prisma/db", () => ({
  message: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../services/s3", () => ({
  uploadToS3: jest.fn(),
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

  describe("Upload file controller", () => {
    let req: RequestWithUser;
    let res: Response;

    beforeEach(() => {
      req = {
        body: { recipentId: 2 },
        userId: 1,
      } as RequestWithUser;

      res = mockResponse();

      (uploadToS3 as jest.Mock).mockResolvedValue({
        fileUrl: "https://mocked-s3-url.com/uploaded-file.jpg",
      });

      (db.message.create as jest.Mock).mockResolvedValue({
        senderId: 1,
        recipentId: 2,
        message: "https://mocked-s3-url.com/uploaded-file.jpg",
        type: "FILE",
        sentAt: new Date(),
        isRead: false,
      });
    });

    it("Should handle errors during file upload to S3", async () => {
      (uploadToS3 as jest.Mock).mockRejectedValue(
        new Error("S3 upload failed"),
      );

      req.file = {
        fieldname: "file",
        originalname: "test.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: Buffer.from("test"),
        size: 1000,
      } as Express.Multer.File;

      await uploadFile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        err: expect.anything(),
      });
    });

    it("Should upload file to S3 and save to database", async () => {
      req.file = {
        fieldname: "file",
        originalname: "fight_card.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: Buffer.from("..."),
        size: 927118,
      } as Express.Multer.File;

      await uploadFile(req, res);

      expect(uploadToS3).toHaveBeenCalledWith({
        file: req.file,
        userId: req.userId,
      });

      expect(db.message.create).toHaveBeenCalledWith({
        data: {
          senderId: 1,
          recipentId: 2,
          message: "https://mocked-s3-url.com/uploaded-file.jpg",
          type: "FILE",
          sentAt: expect.any(Date),
          isRead: false,
        },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          senderId: 1,
          recipentId: 2,
          message: "https://mocked-s3-url.com/uploaded-file.jpg",
          type: "FILE",
          sentAt: expect.any(Date),
          isRead: false,
        }),
      );
    });
  });
});
