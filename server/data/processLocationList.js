import fs from "fs";

const processLocationList = (inputFilePath) => {
  fs.writeFileSync("./server/tests/letter-l.json", "some data", (err) => {
    if (err) {
      throw err;
    } else {
      console.log("file successfully created");
    }
  });
};

export default processLocationList;
