import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import { generateToken } from "../src/utils/jwt.js";

let adminToken;

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");

  const admin = await User.create({
    email: "admin@test.com",
    password: "hashedpassword",
    is_admin: true,
  });

  adminToken = generateToken({
    user_id: admin._id,
    is_admin: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Sweets API", () => {
  it("admin should add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 50,
        quantity: 10,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Ladoo");
  });

  it("user should fetch sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});