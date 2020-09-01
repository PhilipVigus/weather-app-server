import fs from "fs";
import processLocationList from "../data/processLocationList.js";
import e from "express";

describe("processLocationList", () => {
  it("outputs a file with the right filename", () => {
    processLocationList(
      "./server/tests/fixtures/singleLocation.json",
      "./server/tests/"
    );
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
    processLocationList(
      "./server/tests/fixtures/singleLocation.json",
      "./server/tests/"
    );

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
    processLocationList(
      "./server/tests/fixtures/sameInitialAndCountry.json",
      "./server/tests/"
    );

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
      "./server/tests/fixtures/sameInitialDifferentCountries.json",
      "./server/tests/"
    );

    const data = fs.readFileSync("./server/tests/letter-l.json");
    expect(JSON.parse(data)).toEqual(expectedResult);

    fs.unlinkSync("./server/tests/letter-l.json");
  });

  it("outputs a file with the right content for location with states", () => {
    const expectedResult = [
      {
        id: 222,
        name: "Los Angeles, CA, United States (26.33°, 56.41°)",
      },
    ];
    processLocationList(
      "./server/tests/fixtures/locationWithState.json",
      "./server/tests/"
    );

    const data = fs.readFileSync("./server/tests/letter-l.json");
    expect(JSON.parse(data)).toEqual(expectedResult);

    fs.unlinkSync("./server/tests/letter-l.json");
  });

  it("outputs multiple files when locations start with different initials", () => {
    const expectedResultForLFile = [
      {
        id: 222,
        name: "Lisbon, Portugal (26.33°, 56.41°)",
      },
      {
        id: 833,
        name: "London, United Kingdom (34.33°, 47.15°)",
      },
    ];

    const expectedResultForSFile = [
      {
        id: 1234,
        name: "Slough, United Kingdom (12.20°, 28.42°)",
      },
    ];

    processLocationList(
      "./server/tests/fixtures/differentInitials.json",
      "./server/tests/"
    );
    const lData = fs.readFileSync("./server/tests/letter-l.json");
    fs.unlinkSync("./server/tests/letter-l.json");

    expect(JSON.parse(lData)).toEqual(expectedResultForLFile);

    const sData = fs.readFileSync("./server/tests/letter-s.json");
    fs.unlinkSync("./server/tests/letter-s.json");

    expect(JSON.parse(sData)).toEqual(expectedResultForSFile);
  });
});
