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
  const unsortedList = cityList.map((city) => {
    return {
      id: city.id,
      name: `${city.name}${getStateString(city.state)}, ${getCountryName(
        city.country
      )}`,
      coord: city.coord,
    };
  });

  const sortedList = unsortedList.sort((firstCity, secondCity) => {
    return firstCity.name > secondCity.name ? -1 : 1;
  });

  const filteredList = sortedList.filter((location, index) => {
    if (index === sortedList.length - 1) {
      return true;
    }

    const sameName = location.name === sortedList[index + 1].name;

    const latitudeDifference = Math.abs(
      location.coord.lat - sortedList[index + 1].coord.lat
    );

    const longitudeDifference = Math.abs(
      location.coord.lon - sortedList[index + 1].coord.lon
    );

    if (sameName && latitudeDifference <= 1 && longitudeDifference <= 1) {
      return false;
    } else {
      return true;
    }
  });

  let listWithUnambiguousNames = [...filteredList];

  filteredList.forEach((location) => {
    const locationName = location.name;
    const locationsWithName = filteredList.filter((l) => {
      return l.name === locationName;
    });

    if (locationsWithName.length > 1) {
      listWithUnambiguousNames = listWithUnambiguousNames.map((location) => {
        if (location.name !== locationName) {
          return location;
        } else {
          location.name = `${location.name} (${location.coord.lat}°, ${location.coord.lon}°)`;
          return location;
        }
      });
    }
  });

  const finalList = listWithUnambiguousNames.map((city) => {
    return {
      id: city.id,
      name: city.name,
    };
  });

  return finalList;
};

export default newProcessCityList;
