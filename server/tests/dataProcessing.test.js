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
        name: "London, United Kingdom (34.33°, 47.16°)",
      },
    ];
    processLocationList("./server/tests/fixtures/singleLocation.json");

    const data = fs.readFileSync("./server/tests/letter-l.json");
    expect(JSON.parse(data)).toEqual(expectedResult);

    fs.unlinkSync("./server/tests/letter-l.json");
  });

  it("outputs a file with the right content for a several locations with the same initial letter and country", () => {
    const expectedResult = [
      {
        id: 833,
        name: "London, United Kingdom (34.33°, 47.15°)",
      },
      {
        id: 1234,
        name: "Loughborough, United Kingdom (12.20°, 28.42°)",
      },
    ];
    processLocationList("./server/tests/fixtures/sameInitialAndCountry.json");

    const data = fs.readFileSync("./server/tests/letter-l.json");
    expect(JSON.parse(data)).toEqual(expectedResult);

    fs.unlinkSync("./server/tests/letter-l.json");
  });

  it("outputs a file with the right content for a several locations with the same initial letter and different countries", () => {
    const expectedResult = [
      {
        id: 222,
        name: "Lisbon, Portugal (26.33°, 56.41°)",
      },
      {
        id: 833,
        name: "London, United Kingdom (34.33°, 47.15°)",
      },
      {
        id: 1234,
        name: "Loughborough, United Kingdom (12.20°, 28.42°)",
      },
    ];
    processLocationList(
      "./server/tests/fixtures/sameInitialDifferentCountries.json"
    );

    const data = fs.readFileSync("./server/tests/letter-l.json");
    expect(JSON.parse(data)).toEqual(expectedResult);

    fs.unlinkSync("./server/tests/letter-l.json");
  });
});
