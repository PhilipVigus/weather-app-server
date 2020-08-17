import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/:letter", (req, res, next) => {
  if (fs.existsSync(`./server/data/letter-${req.params.letter}.json`)) {
    const data = fs.readFileSync(
      `./server/data/letter-${req.params.letter}.json`
    );
    res.status(200).send(JSON.parse(data));
  } else {
    res
      .status(422)
      .send({ error: "No locations found starting with that letter" });
  }
});

router.get("/names/:id", (req, res, next) => {
  const data = fs.readFileSync(`./server/data/sortedFullData.json`);
  const dataAsJSON = JSON.parse(data);

  const location = dataAsJSON.find((location) => {
    return location.id === parseInt(req.params.id);
  });

  res.status(200).send({ name: location.name });
});

export default router;
