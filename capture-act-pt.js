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
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-british-columbia/pt-acting-bc-vancouver/"
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
          "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-british-columbia/pt-acting-bc-lower-mainland/"
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
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-british-columbia/pt-acting-bc-other/"
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
            const newSchool = formatSchoolObjectPt(
              school,
              "British Columbia",
              "Other"
            );
            if (newSchool.city.includes(",")) {
              newSchool.city = newSchool.city.split(", ");
              newSchool.city.forEach((city) => {
                const tempSchool = { ...newSchool };
                tempSchool.city = city;
                formattedSchools.push(tempSchool);
              });
            } else {
              formattedSchools.push(newSchool);
            }
          });
        })
    )
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/act/pt/bc.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchBCSchools();

//Alberta
function fetchAlbertaSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-alberta-acting/"
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
        const newSchool = formatSchoolObjectPt(school, "Alberta", "Alberta");

        if (newSchool.city.includes(",")) {
          newSchool.city = newSchool.city.split(", ");
          newSchool.city.forEach((city) => {
            const tempSchool = { ...newSchool };
            tempSchool.city = city;
            formattedSchools.push(tempSchool);
          });
        } else {
          formattedSchools.push(newSchool);
        }
      });
    })
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/act/pt/ab.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchAlbertaSchools();

//Saskatchewan
function fetchSaskSchools() {
  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-manitoba-saskatchewan/"
    )
    .then((data) => {
      const contentSection = findContent(data.data);

      const startIndex = contentSection.indexOf("</h3>");
      const noTitle = contentSection.slice(startIndex);

      const firstProvContent = noTitle.slice(
        0,
        noTitle.indexOf("<h3>Manitoba</h3>")
      );

      const schoolsList = makeSchoolsArray(firstProvContent);
      for (let i = 0; i < schoolsList.length; i++) {
        if (!schoolsList[i].includes("href")) {
          schoolsList.splice(i, 1);
        }
      }

      const formattedSchools = [];

      schoolsList.forEach((school) => {
        formattedSchools.push(
          formatSchoolObjectPt(school, "Saskatchewan", "Saskatchewan")
        );
      });

      let dataArray = [...formattedSchools];
      let dataJSON = JSON.stringify(dataArray);

      fs.writeFile("./captured-data/act/pt/sk.json", dataJSON, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    });
}

fetchSaskSchools();

//Manitoba
function fetchManitobaSchools() {
  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-manitoba-saskatchewan/"
    )
    .then((data) => {
      const contentSection = findContent(data.data);
      const secondProvContent = contentSection.slice(
        contentSection.indexOf("<h3>Manitoba</h3>")
      );

      const schoolsList = makeSchoolsArray(secondProvContent);
      for (let i = 0; i < schoolsList.length; i++) {
        if (!schoolsList[i].includes("href")) {
          schoolsList.splice(i, 1);
        }
      }

      const formattedSchools = [];

      schoolsList.forEach((school) => {
        formattedSchools.push(
          formatSchoolObjectPt(school, "Manitoba", "Manitoba")
        );
      });

      let dataArray = [...formattedSchools];
      let dataJSON = JSON.stringify(dataArray);

      fs.writeFile("./captured-data/act/pt/mb.json", dataJSON, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    });
}

fetchManitobaSchools();

//Ontario

function fetchOntarioSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-ontario/pt-acting-ontario-toronto/"
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
        const newSchool = formatSchoolObjectPt(school, "Ontario", "Toronto");

        if (newSchool.city.includes(",")) {
          newSchool.city = newSchool.city.split(", ");
          newSchool.city.forEach((city) => {
            const tempSchool = { ...newSchool };
            tempSchool.city = city;
            formattedSchools.push(tempSchool);
          });
        } else {
          formattedSchools.push(newSchool);
        }
      });
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-ontario/pt-acting-ontario-gta/"
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
            const newSchool = formatSchoolObjectPt(school, "Ontario", "GTA");
            if (newSchool.city.includes(",")) {
              newSchool.city = newSchool.city.split(", ");
              newSchool.city.forEach((city) => {
                const tempSchool = { ...newSchool };
                tempSchool.city = city;
                formattedSchools.push(tempSchool);
              });
            } else {
              formattedSchools.push(newSchool);
            }
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-ontario/pt-acting-ontario-ottawa-kingston-sudbury-barrie-bradford/"
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
            const newSchool = formatSchoolObjectPt(
              school,
              "Ontario",
              "Ottawa and Area"
            );
            if (newSchool.city.includes(",")) {
              newSchool.city = newSchool.city.split(", ");
              newSchool.city.forEach((city) => {
                const tempSchool = { ...newSchool };
                tempSchool.city = city;
                formattedSchools.push(tempSchool);
              });
            } else {
              formattedSchools.push(newSchool);
            }
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/part-time-acting-ontario/pt-acting-ontario-guelph-london-hamilton-kitchener-stratford-niagara-cambridge/"
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
            const newSchool = formatSchoolObjectPt(
              school,
              "Ontario",
              "London and Area"
            );
            if (newSchool.city.includes(",")) {
              newSchool.city = newSchool.city.split(", ");
              newSchool.city.forEach((city) => {
                const tempSchool = { ...newSchool };
                tempSchool.city = city;
                formattedSchools.push(tempSchool);
              });
            } else {
              formattedSchools.push(newSchool);
            }
          });
        })
    )
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/act/pt/on.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchOntarioSchools();

//Québec

function fetchQuebecSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-quebec/"
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
        const newSchool = formatSchoolObjectPt(school, "Québec", "Québec");

        if (newSchool.city.includes(",")) {
          newSchool.city = newSchool.city.split(", ");
          newSchool.city.forEach((city) => {
            const tempSchool = { ...newSchool };
            tempSchool.city = city;
            formattedSchools.push(tempSchool);
          });
        } else {
          formattedSchools.push(newSchool);
        }
      });
    })
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/act/pt/qu.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchQuebecSchools();

//New Brunswick
function fetchNBSchools() {
  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-new-brunswick-newfoundland-pei/"
    )
    .then((data) => {
      const contentSection = findContent(data.data);

      const startIndex = contentSection.indexOf("</h3>");
      const noTitle = contentSection.slice(startIndex);

      const firstProvContent = noTitle.slice(
        0,
        noTitle.indexOf("<h3>Newfoundland</h3>")
      );

      const schoolsList = makeSchoolsArray(firstProvContent);
      for (let i = 0; i < schoolsList.length; i++) {
        if (!schoolsList[i].includes("href")) {
          schoolsList.splice(i, 1);
        }
      }

      const formattedSchools = [];

      schoolsList.forEach((school) => {
        formattedSchools.push(
          formatSchoolObjectPt(school, "New Brunswick", "New Brunswick")
        );
      });

      let dataArray = [...formattedSchools];
      let dataJSON = JSON.stringify(dataArray);

      fs.writeFile("./captured-data/act/pt/nb.json", dataJSON, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    });
}

fetchNBSchools();

//Newfoundland
function fetchNLDSchools() {
  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-new-brunswick-newfoundland-pei/"
    )
    .then((data) => {
      const contentSection = findContent(data.data);
      const secondProvContent = contentSection.slice(
        contentSection.indexOf("<h3>Newfoundland</h3>"),
        contentSection.indexOf("<h3>Prince Edward Island</h3>")
      );

      const schoolsList = makeSchoolsArray(secondProvContent);
      for (let i = 0; i < schoolsList.length; i++) {
        if (!schoolsList[i].includes("href")) {
          schoolsList.splice(i, 1);
        }
      }

      const formattedSchools = [];

      schoolsList.forEach((school) => {
        formattedSchools.push(
          formatSchoolObjectPt(school, "Newfoundland", "Newfoundland")
        );
      });

      let dataArray = [...formattedSchools];
      let dataJSON = JSON.stringify(dataArray);

      fs.writeFile("./captured-data/act/pt/nfl.json", dataJSON, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    });
}

fetchNLDSchools();

//PEI
function fetchPEISchools() {
  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-new-brunswick-newfoundland-pei/"
    )
    .then((data) => {
      const contentSection = findContent(data.data);
      const secondProvContent = contentSection.slice(
        contentSection.indexOf("<h3>Prince Edward Island</h3>")
      );

      const schoolsList = makeSchoolsArray(secondProvContent);
      for (let i = 0; i < schoolsList.length; i++) {
        if (!schoolsList[i].includes("href")) {
          schoolsList.splice(i, 1);
        }
      }

      const formattedSchools = [];

      schoolsList.forEach((school) => {
        formattedSchools.push(
          formatSchoolObjectPt(
            school,
            "Prince Edward Island",
            "Prince Edward Island"
          )
        );
      });

      let dataArray = [...formattedSchools];
      let dataJSON = JSON.stringify(dataArray);

      fs.writeFile("./captured-data/act/pt/pei.json", dataJSON, function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    });
}

fetchPEISchools();

//Nova Scotia

function fetchNSSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/acting-2/part-time-acting-training/pt-acting-nova-scotia/"
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
        const newSchool = formatSchoolObjectPt(
          school,
          "Nova Scotia",
          "Nova Scotia"
        );

        if (newSchool.city.includes(",")) {
          newSchool.city = newSchool.city.split(", ");
          newSchool.city.forEach((city) => {
            const tempSchool = { ...newSchool };
            tempSchool.city = city;
            formattedSchools.push(tempSchool);
          });
        } else {
          formattedSchools.push(newSchool);
        }
      });
    })
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/act/pt/ns.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchNSSchools();
