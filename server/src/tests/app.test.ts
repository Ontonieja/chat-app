import request from "supertest";
import { app } from "../app";

describe("POST /users", () => {
  describe("given a username and password", () => {
    test("should respond with a 200 status code and return json", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("when the username and password is missing ", () => {});
});
