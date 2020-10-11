const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const getCountryNameFromCode = (countryCode, inputFilePath) => {
  const countryCodeData = fs.readFileSync(`${inputFilePath}countryCodes.json`);
  const parsedCountryCodeData = JSON.parse(countryCodeData);

  for (let i = 0; i < parsedCountryCodeData.length; i += 1) {
    if (parsedCountryCodeData[i].code === countryCode) {
      return parsedCountryCodeData[i].name;
    }
  }

  return countryCode;
};

const getLatLonString = (coords) => {
  const latitude = coords.lat.toFixed(2);
  const longitude = coords.lon.toFixed(2);
  return `(${latitude}°, ${longitude}°)`;
};

const getLocationsWithProcessedProperties = (locations, inputFilePath) => {
  return locations.map((location) => {
    const stateString = location.state ? `${location.state}, ` : "";
    const latLonString = getLatLonString(location.coord);
    const countryName = getCountryNameFromCode(location.country, inputFilePath);

    return {
      id: location.id,
      name: `${location.name}, ${stateString}${countryName} ${latLonString}`,
    };
  });
};

const processLocationList = (inputFilename, inputFilePath, outputFilePath) => {
  const locationData = fs.readFileSync(`${inputFilePath}${inputFilename}`);
  const parsedLocationData = JSON.parse(locationData);

  const processedLocations = getLocationsWithProcessedProperties(
    parsedLocationData,
    inputFilePath
  );

  return processedLocations;
};

const locations = processLocationList("locationList.json", "./", "./");

let db;

const connect = () => {
  db = new sqlite3.Database(
    "./locations.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        createTable();
      }
    }
  );
};

function createTable() {
  console.log("here");
  db.run(
    `
    CREATE TABLE locations(
      id INTEGER PRIMARY KEY NOT NULL,
      name VARCHAR(200) NOT NULL);`,
    (err) => {
      if (err) {
        console.log(`Error = ${err.message}`);
      } else {
        insertLocation(0);
      }
    }
  );
}

const numberOfLocations = locations.length;

const insertLocation = (index) => {
  console.log(index);
  db.run(
    "INSERT INTO locations (id, name) VALUES(?, ?)",
    [locations[index].id, locations[index].name],
    (err) => {
      if (err) {
        console.log(`Error = ${err.message}`);
      } else {
        if (index < numberOfLocations - 1) {
          insertLocation(index + 1);
        } else {
          db.close();
        }
      }
    }
  );
};

connect();
