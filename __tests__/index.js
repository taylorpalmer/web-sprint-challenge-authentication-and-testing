const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbconfig");

// afterAll(async () => {
//   await db.destroy();
// });

describe("auth reg unit tests", () => {
  afterAll(async () => {
    await db("users").truncate();
  });
  beforeEach(async () => {
    await db.seed.run();
  });

  it("POST /register success", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "finn", password: "shmowzow" });
    // @ts-ignore
    expect(res.statusCode).toBe(201);
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("finn");
  });

  it("POST /register fails", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "dalecooper", password: "password" });
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.status).toBe(409);
  });
});

describe("auth login unit tests", () => {
  afterAll(async () => {
    await db("users").truncate();
  });
  beforeEach(async () => {
    await db("users").truncate();
    await supertest(server)
      .post("/api/auth/register")
      .send({ username: "user1", password: "pass" });
  });

  it("POST /login success", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "user1", password: "pass" });
    // @ts-ignore
    expect(res.statusCode).toBe(200);
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  it("POST /login fails", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "notuser", password: "word" });
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.status).toBe(401);
  });
});
