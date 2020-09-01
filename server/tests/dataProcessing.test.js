import fs from "fs";
import processLocationList from "../data/processLocationList.js";

describe("processLocationList", () => {
  it("outputs a file with the right filename", () => {
    processLocationList("./fixtures/singleLocation");
    expect(fs.existsSync("./server/tests/letter-l.json")).toBe(true);
    fs.unlinkSync("./server/tests/letter-l.json");
  });
});
