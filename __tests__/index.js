const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbconfig");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("auth unit tests", () => {
  it("POST /register success", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({ username: "finn", password: "shmowzow" });
    // @ts-ignore
    expect(res.statusCode).toBe(201);
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("finn");
    expect(res.body.username).toBe("shmowzow");
  });
  it("POST /register fails", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({ username: "", password: "" });
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.status).toBe(500);
  });
});
