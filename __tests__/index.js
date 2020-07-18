const supertest = require("supertest");
const server = require("../api/server");
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
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("finn");
    expect(res.body.username).toBe("shmowzow");
  });

  it("POST /register fails", async () => {
    const res = await supertest(server)
      .post("/register")
      .send({ username: "", password: "" });
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.status).toBe(500);
  });

  it("POST /login success", async () => {
    const res = await supertest(server)
      .post("/login")
      .send({ username: "dalecooper", password: "password" });
    // @ts-ignore
    expect(res.statusCode).toBe(201);
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.body.id).toBeDefined();
    expect(res.body.username).toBe("dalecooper");
    expect(res.body.username).toBe("password");
  });

  it("POST /login fails", async () => {
    const res = await supertest(server)
      .post("/login")
      .send({ username: "", password: "" });
    // @ts-ignore
    expect(res.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.status).toBe(500);
  });
});
