import express from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const verboseDb = sqlite3.verbose();

let db;

router.get("/:letter", (req, res, next) => {
  handleGetAllLocationsWithInitial(req.params.letter, res);
});

const handleGetAllLocationsWithInitial = (letter, res) => {
  db = new verboseDb.Database(
    "./server/data/locations.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        findLocationsWithInitial(letter, res);
      }
    }
  );
};

const findLocationsWithInitial = (letter, res) => {
  db.all(
    `SELECT * FROM locations WHERE name LIKE '${letter}%' ORDER BY name ASC;`,
    [],
    (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        sendLocationsWithInitial(rows, res);
      }
    }
  );
};

const sendLocationsWithInitial = (rows, res) => {
  if (rows.length === 0) {
    res
      .status(422)
      .send({ error: "No locations found with specified initial letter" });
  } else {
    res.status(200).send(rows);
  }
};

router.get("/names/:id", (req, res, next) => {
  handleGetNameFromId(parseInt(req.params.id), res);
});

const handleGetNameFromId = (id, res) => {
  db = new verboseDb.Database(
    "./server/data/locations.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        findLocationFromId(id, res);
      }
    }
  );
};

const findLocationFromId = (id, res) => {
  db.all(`SELECT * from locations where id=${id};`, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      sendName(rows, res);
    }
  });
};

const sendName = (rows, res) => {
  if (rows.length === 0) {
    res.status(422).send({ error: "location id not found" });
  } else {
    res.status(200).send({ name: rows[0].name });
  }
};

export default router;
