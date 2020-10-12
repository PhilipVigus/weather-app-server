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
      expect(res.body[0].name).toBe("Xagħra, Malta (36.05°, 14.26°)");
      expect(res.body[877].name).toBe("Xıllı, Azerbaijan (39.43°, 49.10°)");
    });

    it("returns status 422 when the letter is invalid", async () => {
      const res = await request(app).get("/locations/*");
      expect(res.status).toBe(422);
    });
  });

  describe("fetching a single location name for a given id", () => {
    it("handles ids that can be found", async () => {
      const res = await request(app).get("/locations/names/225284");
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("'Ali Sabieh, Djibouti (11.16°, 42.71°)");
    });

    it("handles ids that can't be found", async () => {
      const res = await request(app).get("/locations/names/1");
      expect(res.status).toBe(422);
      expect(res.body).toEqual({ error: "location id not found" });
    });
  });
});
