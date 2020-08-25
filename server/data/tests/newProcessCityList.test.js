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
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
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
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
      {
        id: 843,
        name: "London, UK",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
    ]);
  });
});
