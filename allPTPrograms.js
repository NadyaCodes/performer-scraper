import { allPrograms } from "./allCaptured.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { allSchools } from "./allSchools.js";
import { allCities } from "./allCities.js";
import { allSchoolsLocations } from "./allSchoolsLocations.js";

export const allPtPrograms = {};

const allDisciplines = Object.keys(allPrograms);

allDisciplines.forEach((item) => {
  const provinces = Object.keys(allPrograms[item].pt);
  provinces.forEach((prov) => {
    allPrograms[item].pt[prov].forEach((entry) => {
      let { name, website, city } = entry;
      const lowerName = name.toLowerCase();
      const lowerSite = website.toLowerCase();
      const lowerCity = city.toLowerCase();

      const schoolId = Object.values(allSchools).filter(
        (value) => value.name === lowerName
      )[0].id;

      const cityId = Object.values(allCities).filter(
        (value) => value.city === lowerCity
      )[0].id;

      const schoolLocationId = Object.values(allSchoolsLocations).filter(
        (value) => value.school_id === schoolId && value.location_id === cityId
      )[0].id;
      if (
        !Object.values(allPtPrograms).some(
          (value) =>
            value.school_location_id === schoolLocationId && value.type === item
        )
      ) {
        const newID = uuidv4();
        allPtPrograms[newID] = {
          id: newID,
          school_location_id: schoolLocationId,
          site: lowerSite,
          type: item,
          style: "pt",
        };
      }
    });
  });
});

let dataJSON = JSON.stringify(allPtPrograms);

fs.writeFile("./captured-data/allPtPrograms.json", dataJSON, function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
