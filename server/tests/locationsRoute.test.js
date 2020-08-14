import request from "supertest";
import app from "../app";

describe("locations route", () => {
  it("returns status 200 when you specify a legitimate starting letter", async () => {
    const res = await request(app).get("/locations/a");
    expect(res.status).toBe(200);
  });

  it("returns the locations starting with the specified letter", async () => {
    const res = await request(app).get("/locations/x");
    expect(res.body.length).toBe(878);
    expect(res.body[0].name).toBe("Xagħra, Malta (14.26°, 36.05°)");
    expect(res.body[877].name).toBe("Xıllı, Azerbaijan (49.10°, 39.43°)");
  });

  it("returns status 422 when the letter is invalid", async () => {
    const res = await request(app).get("/locations/id");
    expect(res.status).toBe(422);
  });
});
