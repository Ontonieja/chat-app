// __tests__/authController.test.ts
import { signUp, userLogin, getUserInfo } from "../controllers/auth";
import db from "../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { mockDeep } from "jest-mock-extended";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../prisma/db", () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller", () => {
  describe("signUp", () => {
    it("should create a new user and return 200 with user data", async () => {
      const req = {
        body: { email: "test@example.com", password: "password123" },
      } as Request;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue(null);
      (bcrypt.hashSync as jest.Mock).mockReturnValue("hashedPassword");
      (db.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@example.com",
        name: "Test User",
      });
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.cookie).toHaveBeenCalledWith(
        "jwt",
        "mockToken",
        expect.any(Object),
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "User created:",
        user: { id: 1, email: "test@example.com", name: "Test User" },
      });
    });

    it("should return 400 if user already exists", async () => {
      const req = {
        body: { email: "test@example.com", password: "password123" },
      } as Request;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@example.com",
      });

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Email is already in use",
      });
    });
  });

  describe("userLogin", () => {
    it("should log in an existing user and return 200 with user data", async () => {
      const req = {
        body: { email: "test@example.com", password: "password123" },
      } as Request;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.cookie).toHaveBeenCalledWith(
        "jwt",
        "mockToken",
        expect.any(Object),
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "Logged in successfully",
        user: { id: 1, email: "test@example.com", name: undefined },
      });
    });

    it("should return 400 if user is not found", async () => {
      const req = {
        body: { email: "test@example.com", password: "password123" },
      } as Request;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue(null);

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return 400 if password is incorrect", async () => {
      const req = {
        body: { email: "test@example.com", password: "wrongPassword" },
      } as Request;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Wrong password or email",
      });
    });
  });

  describe("getUserInfo", () => {
    it("should return user info if user is authenticated", async () => {
      const req = { user: { userId: 1 } } as any;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        email: "test@example.com",
        name: "Test User",
        profileSetup: true,
      });

      await getUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        email: "test@example.com",
        name: "Test User",
        profileSetup: true,
      });
    });

    it("should return 404 if user is not found", async () => {
      const req = { user: { userId: 1 } } as any;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue(null);

      await getUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User with the given id not found",
      });
    });
  });
});
