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

const requiredDataFields = cityData.map((city) => {
  return {
    id: city.id,
    name: city.name,
    state: city.state,
    country: getCountryName(city.country),
  };
});

const sortedData = requiredDataFields.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
});

let currentStartingLetter = sortedData[0].name.toLowerCase().charAt(0);
let sortedCityArrays = {};
let currentCityArray = [];

const storeCurrentArray = () => {
  if (sortedCityArrays[currentStartingLetter]) {
    sortedCityArrays[currentStartingLetter].concat(currentCityArray);
  } else {
    sortedCityArrays[currentStartingLetter] = currentCityArray;
  }
};

const startNewLetter = (currentPosition) => {
  currentStartingLetter = sortedData[currentPosition].name
    .toLowerCase()
    .charAt(0);
  currentCityArray = [];
  currentCityArray.push(sortedData[currentPosition]);
};

for (let i = 0; i < sortedData.length; i += 1) {
  const cityStartingLetter = sortedData[i].name.toLowerCase().charAt(0);
  if (cityStartingLetter === currentStartingLetter) {
    currentCityArray.push(sortedData[i]);
  } else {
    storeCurrentArray();
    startNewLetter(i);
  }
}

for (let [key, value] of Object.entries(sortedCityArrays)) {
  fs.writeFileSync(`./letter-${key}.json`, JSON.stringify(value));
}