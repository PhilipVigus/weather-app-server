import fs from "fs";
import processLocationList from "../data/processLocationList.js";
import e from "express";

describe("processLocationList", () => {
  it("outputs a file with the right filename", () => {
    processLocationList("./server/tests/fixtures/singleLocation.json");
    expect(fs.existsSync("./server/tests/letter-l.json")).toBe(true);
    fs.unlinkSync("./server/tests/letter-l.json");
  });

  it("outputs a file with the right content for a single location", () => {
    const expectedResult = [
      {
        id: 833,
        name: "London, United Kingdom (34.33°, 47.15°)",
      },
    ];
    processLocationList("./server/tests/fixtures/singleLocation.json");

    const data = fs.readFileSync("./server/tests/letter-l.json");
    expect(JSON.parse(data)).toEqual(expectedResult);

    fs.unlinkSync("./server/tests/letter-l.json");
  });
});
