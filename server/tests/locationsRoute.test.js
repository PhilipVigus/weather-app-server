import request from "supertest";
import app from "../app";

describe("locations route", () => {
  describe("fetching locations starting with initial letters", () => {
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

  describe("fetching a single location name for a given id", () => {
    it("returns status 200 when you specify a legitimate id", async () => {
      const res = await request(app).get("/locations/names/225284");
      expect(res.status).toBe(200);
    });

    it("returns status 422 when the id is invalid", async () => {
      const res = await request(app).get("/locations/names/abc");
      expect(res.status).toBe(422);
    });

    it("returns an error when the id is invalid", async () => {
      const res = await request(app).get("/locations/names/abc");
      expect(res.body).toEqual({ error: "location id not found" });
    });

    it("returns the name for a given id", async () => {
      const res = await request(app).get("/locations/names/225284");
      expect(res.body.name).toBe("'Ali Sabieh, Djibouti (42.71°, 11.16°)");
    });
  });
});