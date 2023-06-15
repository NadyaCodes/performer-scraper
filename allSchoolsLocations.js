import { allPrograms } from "./allCaptured.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { allSchools } from "./allSchools.js";
import { allCities } from "./allCities.js";

export const allSchoolsLocations = {};

const allDisciplines = Object.keys(allPrograms);
const ptFt = ["ft", "pt"];

allDisciplines.forEach((item) => {
  ptFt.forEach((type) => {
    const provinces = Object.keys(allPrograms[item][type]);
    provinces.forEach((prov) => {
      allPrograms[item][type][prov].forEach((entry) => {
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
        if (
          !Object.values(allSchoolsLocations).some(
            (item) => item.school_id === schoolId && item.location_id === cityId
          )
        ) {
          const newID = uuidv4();
          allSchoolsLocations[newID] = {
            id: newID,
            school_id: schoolId,
            location_id: cityId,
            site: lowerSite,
            // city: lowerCity,
            // name: lowerName,
          };
        }
      });
    });
  });
});

let dataJSON = JSON.stringify(allSchoolsLocations);

fs.writeFile(
  "./captured-data/allSchoolsLocations.json",
  dataJSON,
  function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  }
);
