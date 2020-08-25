import newProcessCityList from "../newProcessCityList";

describe("newProcessCityList", () => {
  it("leaves the needed data", () => {
    const testData = [
      {
        id: 833,
        name: "Ḩeşār-e Sefīd",
        state: "",
        country: "IR",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
    ];

    expect(newProcessCityList(testData)).toEqual([
      {
        id: 833,
        name: "Ḩeşār-e Sefīd, Iran, Islamic Republic Of",
      },
    ]);
  });

  it("sorts the cities by name", () => {
    const testData = [
      {
        id: 843,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
      {
        id: 833,
        name: "Ḩeşār-e Sefīd",
        state: "",
        country: "IR",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
    ];

    expect(newProcessCityList(testData)).toEqual([
      {
        id: 833,
        name: "Ḩeşār-e Sefīd, Iran, Islamic Republic Of",
      },
      {
        id: 843,
        name: "London, UK",
      },
    ]);
  });

  it("filters out locations that have the same name and are too close to eachother", () => {
    const testData = [
      {
        id: 843,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 47,
          lat: 35,
        },
      },
      {
        id: 833,
        name: "Ḩeşār-e Sefīd",
        state: "",
        country: "IR",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
      {
        id: 853,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 47.5,
          lat: 34.5,
        },
      },
    ];

    expect(newProcessCityList(testData)).toEqual([
      {
        id: 833,
        name: "Ḩeşār-e Sefīd, Iran, Islamic Republic Of",
      },
      {
        id: 853,
        name: "London, UK",
      },
    ]);
  });

  it("doesn't filter locations that are too far apart", () => {
    const testData = [
      {
        id: 843,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 47,
          lat: 35,
        },
      },
      {
        id: 833,
        name: "Ḩeşār-e Sefīd",
        state: "",
        country: "IR",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
      {
        id: 853,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 48.1,
          lat: 34.6,
        },
      },
    ];

    expect(newProcessCityList(testData)).toEqual([
      {
        id: 833,
        name: "Ḩeşār-e Sefīd, Iran, Islamic Republic Of",
      },
      {
        id: 843,
        name: "London, UK (35°, 47°)",
      },
      {
        id: 853,
        name: "London, UK (34.6°, 48.1°)",
      },
    ]);
  });

  it("appends lat/lon to locations with the same name", () => {
    const testData = [
      {
        id: 843,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 47,
          lat: 35,
        },
      },
      {
        id: 853,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 47.6,
          lat: 34.6,
        },
      },
      {
        id: 833,
        name: "Ḩeşār-e Sefīd",
        state: "",
        country: "IR",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
      {
        id: 863,
        name: "London",
        state: "",
        country: "UK",
        coord: {
          lon: 49,
          lat: 34.6,
        },
      },
    ];

    expect(newProcessCityList(testData)).toEqual([
      {
        id: 833,
        name: "Ḩeşār-e Sefīd, Iran, Islamic Republic Of",
      },
      {
        id: 853,
        name: "London, UK (34.6°, 47.6°)",
      },
      {
        id: 863,
        name: "London, UK (34.6°, 49°)",
      },
    ]);
  });
});
