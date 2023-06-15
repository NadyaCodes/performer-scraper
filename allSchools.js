import { allPrograms } from "./allCaptured.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export const allSchools = {};

const allDisciplines = Object.keys(allPrograms);
const ptFt = ["ft", "pt"];

allDisciplines.forEach((item) => {
  ptFt.forEach((type) => {
    const provinces = Object.keys(allPrograms[item][type]);
    provinces.forEach((prov) => {
      allPrograms[item][type][prov].forEach((entry) => {
        let { name, website } = entry;
        if (!website.includes("www.facebook.com")) {
          if (!website.includes("www.instagram.com")) {
            if (website.split("/").length > 3) {
              const websiteParts = website.split("/");
              website = websiteParts.slice(0, 3).join("/");
            }
          }
        }
        const lowerName = name.toLowerCase();
        const lowerSite = website.toLowerCase();
        if (
          !Object.values(allSchools).some((item) => item.name === lowerName)
        ) {
          const newID = uuidv4();
          allSchools[newID] = {
            id: newID,
            name: lowerName,
            site: lowerSite,
          };
        }
      });
    });
  });
});
// console.log(allSchools);

let dataJSON = JSON.stringify(allSchools);

fs.writeFile("./captured-data/allSchools.json", dataJSON, function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
