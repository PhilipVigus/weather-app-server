"use strict";
const fs = require("fs");
const cityData = require("./cityList.json");
const countryCodes = require("./countryCodes.json");

const getCountryName = (countryCode) => {
  for (let i = 0; i < countryCodes.length; i += 1) {
    if (countryCodes[i].code === countryCode) {
      return countryCodes[i].name;
    }
  }

  return countryCode;
};

const filteredData = cityData.map((city) => {
  return {
    id: city.id,
    name: city.name,
    state: city.state,
    country: getCountryName(city.country),
  };
});

const sortedData = filteredData.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
});

let initialLetter = sortedData[0].name.toLowerCase().charAt(0);
let citiesObject = {};
let currentLetterArray = [];

for (let i = 0; i < sortedData.length; i += 1) {
  if (sortedData[i].name.toLowerCase().charAt(0) === initialLetter) {
    currentLetterArray.push(sortedData[i]);
  } else {
    if (citiesObject[initialLetter]) {
      citiesObject[initialLetter].concat(currentLetterArray);
    } else {
      citiesObject[initialLetter] = currentLetterArray;
    }

    initialLetter = sortedData[i].name.toLowerCase().charAt(0);
    currentLetterArray = [];
    currentLetterArray.push(sortedData[i]);
  }
}

for (let [key, value] of Object.entries(citiesObject)) {
  fs.writeFileSync(
    `./server/data/processed-cities-by-letter/letter-${key}.json`,
    JSON.stringify(value)
  );
}
