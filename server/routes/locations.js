import express from "express";
import fs from "fs";
const router = express.Router();

router.get("/:id", (req, res, next) => {
  if (fs.existsSync(`./server/data/letter-${req.params.id}.json`)) {
    const data = fs.readFileSync(`./server/data/letter-${req.params.id}.json`);
    res.status(200).send(JSON.parse(data));
  } else {
    res
      .status(422)
      .send({ error: "No locations found starting with that letter" });
  }
});

export default router;
