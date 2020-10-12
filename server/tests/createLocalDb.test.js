import createLocalDb from "../data/createLocalDb";
import fs from "fs";

describe("createLocalDb", () => {
  beforeAll(() => {
    fs.unlinkSync("./server/tests/testLocations.db");
  });

  it("creates the local db", () => {
    createLocalDb(
      "./server/tests/",
      "testLocationList.json",
      "testLocations.db"
    );

    expect(true).toBe(true);
  });
});
