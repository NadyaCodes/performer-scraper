import { allPrograms } from "./allCaptured.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export const allCities = {};

const allDisciplines = Object.keys(allPrograms);
const ptFt = ["ft", "pt"];

allDisciplines.forEach((item) => {
  ptFt.forEach((type) => {
    const provinces = Object.keys(allPrograms[item][type]);
    provinces.forEach((prov) => {
      allPrograms[item][type][prov].forEach((entry) => {
        let { city, province, area } = entry;
        if (!area) {
          area = city;
        }
        if (area === "Other") {
          area = province;
        }
        const lowerCity = city.toLowerCase();
        const lowerProv = province.toLowerCase();
        const lowerArea = area.toLowerCase();
        if (!Object.values(allCities).some((item) => item.city === lowerCity)) {
          const newID = uuidv4();
          allCities[newID] = {
            id: newID,
            city: lowerCity,
            province: lowerProv,
            area: lowerArea,
          };
        }
      });
    });
  });
});

let dataJSON = JSON.stringify(allCities);

fs.writeFile("./captured-data/allCities.json", dataJSON, function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
