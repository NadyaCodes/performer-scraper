import { allPrograms } from "./allCaptured.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { allSchools } from "./allSchools.js";
import { allCities } from "./allCities.js";
import { allSchoolsLocations } from "./allSchoolsLocations.js";

export const allFtPrograms = {};

const allDisciplines = Object.keys(allPrograms);

allDisciplines.forEach((item) => {
  const provinces = Object.keys(allPrograms[item].ft);
  provinces.forEach((prov) => {
    allPrograms[item].ft[prov].forEach((entry) => {
      let { name, website, city, programs } = entry;
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

      programs.forEach((program) => {
        const lowerProgram = program.toLowerCase();
        if (
          !Object.values(allFtPrograms).some(
            (value) =>
              value.school_location_id === schoolLocationId &&
              value.type === item
          )
        ) {
          const newID = uuidv4();
          allFtPrograms[newID] = {
            id: newID,
            school_location_id: schoolLocationId,
            site: lowerSite,
            type: item,
            program: lowerProgram,
            style: "ft",
          };
        }
      });
    });
  });
});

let dataJSON = JSON.stringify(allFtPrograms);

fs.writeFile("./captured-data/allFtPrograms.json", dataJSON, function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
