import fs from "fs";

const countryCodeData = fs.readFileSync("./server/data/countryCodes.json");
const parsedCountryCodeData = JSON.parse(countryCodeData);

const getCountryNameFromCode = (countryCode) => {
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

const getLocationsWithProcessedProperties = (locations) => {
  return locations.map((location) => {
    const stateString = location.state ? `${location.state}, ` : "";
    const latLonString = getLatLonString(location.coord);
    const countryName = getCountryNameFromCode(location.country);

    return {
      id: location.id,
      name: `${location.name}, ${stateString}${countryName} ${latLonString}`,
    };
  });
};

const getLocationsByInitialLetter = (locations) => {
  const locationsByInitialLetter = {};

  locations.forEach((location) => {
    const initialLetter = location.name.charAt(0).toLowerCase();

    if (locationsByInitialLetter[initialLetter]) {
      locationsByInitialLetter[initialLetter].push(location);
    } else {
      locationsByInitialLetter[initialLetter] = [location];
    }
  });

  return locationsByInitialLetter;
};

const writeLocationsToFiles = (locationsByLetter) => {
  for (const [initialLetter, locations] of Object.entries(locationsByLetter)) {
    const sortedLocations = locations.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    });

    fs.writeFileSync(
      `./server/tests/letter-${initialLetter}.json`,
      JSON.stringify(sortedLocations),
      (err) => {
        if (err) {
          throw err;
        } else {
          console.log("file successfully created");
        }
      }
    );
  }
};

const processLocationList = (inputFilePath) => {
  const locationData = fs.readFileSync(inputFilePath);
  const parsedLocationData = JSON.parse(locationData);

  const processedLocations = getLocationsWithProcessedProperties(
    parsedLocationData
  );

  const locationsByInitialLetter = getLocationsByInitialLetter(
    processedLocations
  );

  writeLocationsToFiles(locationsByInitialLetter);
};

export default processLocationList;
