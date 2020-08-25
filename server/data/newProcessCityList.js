const countryCodes = require("./countryCodes.json");

const getCountryName = (countryCode) => {
  for (let i = 0; i < countryCodes.length; i += 1) {
    if (countryCodes[i].code === countryCode) {
      return countryCodes[i].name;
    }
  }

  return countryCode;
};

const getStateString = (state) => {
  if (state !== "") {
    return `, ${state}`;
  } else {
    return "";
  }
};

const newProcessCityList = (cityList) => {
  const result = cityList.map((city) => {
    return {
      id: city.id,
      name: `${city.name}${getStateString(city.state)}, ${getCountryName(
        city.country
      )}`,
      coord: city.coord,
    };
  });

  return result;
};

export default newProcessCityList;
