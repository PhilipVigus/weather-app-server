import request from "supertest";
import app from "../app";

describe("cities route", () => {
  it("returns status 200 when you specify a legitimate starting letter", async () => {
    const res = await request(app).get("/cities/a");
    expect(res.status).toBe(200);
  });

  it("returns the cities starting with the specified letter", async () => {
    const res = await request(app).get("/cities/x");
    expect(res.body.length).toBe(878);
    expect(res.body[0].name).toBe("Xagħra");
    expect(res.body[877].name).toBe("Xıllı");
  });

  it("returns status 422 when the letter is invalid", async () => {
    const res = await request(app).get("/cities/id");
    expect(res.status).toBe(422);
  });
});
