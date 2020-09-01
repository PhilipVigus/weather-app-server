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

const sortLocationsByName = (locations) => {
  return locations.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });
};

const writeLocationsToOneFile = (locations, outputFilePath) => {
  const sortedLocations = sortLocationsByName(locations);

  fs.writeFileSync(
    `${outputFilePath}sortedFullData.json`,
    JSON.stringify(sortedLocations),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

const writeLocationsToFilesByInitialLetter = (
  locationsByLetter,
  outputFilePath
) => {
  for (const [initialLetter, locations] of Object.entries(locationsByLetter)) {
    const sortedLocations = sortLocationsByName(locations);

    fs.writeFileSync(
      `${outputFilePath}letter-${initialLetter}.json`,
      JSON.stringify(sortedLocations),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }
};

const processLocationList = (inputFilename, inputFilePath, outputFilePath) => {
  const locationData = fs.readFileSync(`${inputFilePath}${inputFilename}`);
  const parsedLocationData = JSON.parse(locationData);

  const processedLocations = getLocationsWithProcessedProperties(
    parsedLocationData,
    inputFilePath
  );

  writeLocationsToOneFile(processedLocations, outputFilePath);

  const locationsByInitialLetter = getLocationsByInitialLetter(
    processedLocations
  );

  writeLocationsToFilesByInitialLetter(
    locationsByInitialLetter,
    outputFilePath
  );
};

module.exports = processLocationList;
