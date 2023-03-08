import axios from "axios";
import fs from "fs";
import {
  makeSchoolsArray,
  findContent,
  formatSchoolObjectPt,
} from "./helpers.js";

//BC
function fetchBCSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-bc/part-time-dance-bc-vancouver/"
    )
    .then((data) => {
      const contentSection = findContent(data.data);

      const startIndex = contentSection.indexOf("</h1>");
      const noTitle = contentSection.slice(startIndex);
      const schoolsList = makeSchoolsArray(noTitle);
      for (let i = 0; i < schoolsList.length; i++) {
        if (!schoolsList[i].includes("href")) {
          schoolsList.splice(i, 1);
        }
      }

      schoolsList.forEach((school) => {
        formattedSchools.push(
          formatSchoolObjectPt(school, "British Columbia", "Vancouver")
        );
      });
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-bc/part-time-dance-bc-lower-mainland/"
        )
        .then((data) => {
          const contentSection = findContent(data.data);

          const startIndex = contentSection.indexOf("</h1>");
          const noTitle = contentSection.slice(startIndex);

          const schoolsList = makeSchoolsArray(noTitle);
          for (let i = 0; i < schoolsList.length; i++) {
            if (!schoolsList[i].includes("href")) {
              schoolsList.splice(i, 1);
            }
          }

          schoolsList.forEach((school) => {
            formattedSchools.push(
              formatSchoolObjectPt(school, "British Columbia", "Lower Mainland")
            );
          });

          console.log(formattedSchools);
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-bc/part-time-dance-bc-islands/"
        )
        .then((data) => {
          const contentSection = findContent(data.data);

          const startIndex = contentSection.indexOf("</h1>");
          const noTitle = contentSection.slice(startIndex);

          const schoolsList = makeSchoolsArray(noTitle);
          for (let i = 0; i < schoolsList.length; i++) {
            if (!schoolsList[i].includes("href")) {
              schoolsList.splice(i, 1);
            }
          }

          schoolsList.forEach((school) => {
            formattedSchools.push(
              formatSchoolObjectPt(school, "British Columbia", "Island")
            );
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-bc/part-time-dance-bc-other/"
        )
        .then((data) => {
          const contentSection = findContent(data.data);

          const startIndex = contentSection.indexOf("</h1>");
          const noTitle = contentSection.slice(startIndex);

          const schoolsList = makeSchoolsArray(noTitle);
          for (let i = 0; i < schoolsList.length; i++) {
            if (!schoolsList[i].includes("href")) {
              schoolsList.splice(i, 1);
            }
          }

          schoolsList.forEach((school) => {
            formattedSchools.push(
              formatSchoolObjectPt(school, "British Columbia", "Other")
            );
          });

          let dataArray = [...formattedSchools];
          let dataJSON = JSON.stringify(dataArray);

          fs.writeFile(
            "./captured-data/dance/pt/bc.json",
            dataJSON,
            function (err) {
              if (err) throw err;
              console.log("File is created successfully.");
            }
          );
        })
    );
}

fetchBCSchools();
