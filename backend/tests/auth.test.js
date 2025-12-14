import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.access_token).toBeDefined();
  });
});