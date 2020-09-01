import fs from "fs";

const processLocationList = (inputFilePath) => {
  const data = fs.readFileSync(inputFilePath);
  const parsedData = JSON.parse(data);
  console.log(parsedData);

  const processedLocations = parsedData.map((location) => {
    return {
      id: location.id,
      name: `${location.name}, United Kingdom (${location.coord.lat.toFixed(
        2
      )}°, ${location.coord.lon.toFixed(2)}°)`,
    };
  });

  console.log(processedLocations);

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
