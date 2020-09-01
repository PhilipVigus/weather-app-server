import fs from "fs";

const processLocationList = (inputFilePath) => {
  const data = fs.readFileSync(inputFilePath);
  const parsedData = JSON.parse(data);
  console.log(parsedData);

  const processedLocations = parsedData.map((location) => {
    return {
      id: location.id,
      name: "London, United Kingdom (34.33°, 47.15°)",
    };
  });

  console.log(processedLocations);

  fs.writeFileSync(
    "./server/tests/letter-l.json",
    JSON.stringify(processedLocations),
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
