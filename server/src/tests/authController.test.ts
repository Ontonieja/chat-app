// __tests__/authController.test.ts
import {
  signUp,
  userLogin,
  getUserInfo,
  updateUserProfile,
} from "../controllers/auth";
import db from "../../prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { mockDeep } from "jest-mock-extended";
import { RequestWithUser } from "../../middlewares/isAuth";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../prisma/db", () => ({
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
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
        userName: "Test User",
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
        user: { id: 1, email: "test@example.com", userName: "Test User" },
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
        user: {
          id: 1,
          email: "test@example.com",
          userName: undefined,
          firstName: undefined,
          lastName: undefined,
          profileSetup: undefined,
          avatar: undefined,
        },
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
      const req = { userId: 13 } as any;
      const res = mockResponse();

      (db.user.findFirst as jest.Mock).mockResolvedValue({
        id: 13,
        email: "test123@gmail.com",
        userName: "Ontonieja",
        firstName: "Maksymilian",
        lastName: "Rusnak",
        profileSetup: true,
        avatar: "/src/assets/avatar2.png",
      });

      await getUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 13,
        email: "test123@gmail.com",
        userName: "Ontonieja",
        firstName: "Maksymilian",
        lastName: "Rusnak",
        profileSetup: true,
        avatar: "/src/assets/avatar2.png",
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

  describe("updateUserProfile", () => {
    it("should update user informations", async () => {
      const req = {
        body: {
          userName: "DangJohn",
          firstName: "John",
          lastName: "Dang",
          avatar: "/assets/avatar1.png",
        },
        userId: "1",
      } as any;
      const res = mockResponse();

      (db.user.update as jest.Mock).mockResolvedValue({
        message: "Profile updated successfully.",
      });

      await updateUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Profile updated successfully.",
      });
    });
  });

  it("should return 400 if not all fields are provided", async () => {
    const req = {
      body: {
        userName: "",
        firstName: "John",
        lastName: "Dang",
        avatar: "/assets/avatar1.png",
      },
      userId: "1",
    } as any;
    const res = mockResponse();

    await updateUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required.",
    });
  });

  it("should return 500 when db update fails", async () => {
    const req = {
      body: {
        userName: "JohnDang",
        firstName: "John",
        lastName: "Dang",
        avatar: "/assets/avatar1.png",
      },
      userId: "1",
    } as any;
    const res = mockResponse();

    (db.user.update as jest.Mock).mockRejectedValueOnce(
      new Error("Database error"),
    );

    await updateUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to update profile.",
    });
  });
});
