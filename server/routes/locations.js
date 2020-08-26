import express from "express";
import fs from "fs";
const router = express.Router();

const readSortedFullData = () => {
  const fullSortedData = fs.readFileSync(`./server/data/sortedFullData.json`);
  return JSON.parse(fullSortedData);
};

const readLetterDataFiles = () => {
  const letterData = {};
  const dir = fs.opendirSync("./server/data/");
  let file;

  while ((file = dir.readSync()) !== null) {
    if (file.name.includes("letter")) {
      const data = fs.readFileSync(`./server/data/${file.name}`);
      const parsedData = JSON.parse(data);
      letterData[file.name] = parsedData;
    }
  }
  dir.closeSync();
  return letterData;
};

const fullSortedDataAsJSON = readSortedFullData();
const fullLetterData = readLetterDataFiles();

router.get("/:letter", (req, res, next) => {
  if (fullLetterData[`letter-${req.params.letter}.json`]) {
    res.status(200).send(fullLetterData[`letter-${req.params.letter}.json`]);
  } else {
    res
      .status(422)
      .send({ error: "No locations found starting with that letter" });
  }
});

router.get("/names/:id", (req, res, next) => {
  const location = fullSortedDataAsJSON.find((location) => {
    return location.id === parseInt(req.params.id);
  });

  location
    ? res.status(200).send({ name: location.name })
    : res.status(422).send({ error: "location id not found" });
});

export default router;
