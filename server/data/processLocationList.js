import fs from "fs";

const processLocationList = (inputFilePath) => {
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

  const locationData = fs.readFileSync(inputFilePath);
  const parsedLocationData = JSON.parse(locationData);

  const processedLocations = parsedLocationData.map((location) => {
    const stateString = location.state ? `${location.state}, ` : "";
    const latAndLonString = `(${location.coord.lat.toFixed(
      2
    )}°, ${location.coord.lon.toFixed(2)}°)`;
    return {
      id: location.id,
      name: `${location.name}, ${stateString}${getCountryNameFromCode(
        location.country
      )} ${latAndLonString}`,
    };
  });

  const sortedLocations = processedLocations.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  fs.writeFileSync(
    "./server/tests/letter-l.json",
    JSON.stringify(sortedLocations),
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log("file successfully created");
      }
    }
  );
};

export default processLocationList;
