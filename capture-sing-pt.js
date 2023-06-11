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
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-british-columbia/part-time-vancouver-singing/"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-british-columbia/part-time-burnaby-richmond-new-westminster-singing/"
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
              formatSchoolObjectPt(
                school,
                "British Columbia",
                "Burnaby, Richmond, New Westminster"
              )
            );
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-british-columbia/part-time-singing-bc-other-lower-mainland/"
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
              "Lower Mainland"
            );
            if (newSchool.city.includes(";")) {
              newSchool.city = newSchool.city.split("; ");
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-british-columbia/part-time-singing-bc-islands/"
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
              "Islands"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-british-columbia/part-time-singing-bc-other/"
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
              "Interior"
            );
            if (newSchool.city.includes(";")) {
              newSchool.city = newSchool.city.split("; ");
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
          "./captured-data/singing/pt/bc.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 4000);
    });
}

fetchBCSchools();

//Alberta
function fetchAlbertaSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-alberta/part-time-calgary-singing/"
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
          formatSchoolObjectPt(school, "Alberta", "Calgary")
        );
      });
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-alberta/part-time-edmonton-singing/"
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
              formatSchoolObjectPt(school, "Alberta", "Edmonton")
            );
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-alberta/part-time-alberta-singing/"
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
            const newSchool = formatSchoolObjectPt(school, "Alberta", "Other");
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
          "./captured-data/singing/pt/ab.json",
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
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-saskatchewan-singing/"
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
          formatSchoolObjectPt(school, "Saskatchewan", "Saskatchewan")
        );
      });
    })
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/singing/pt/sk.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchSaskSchools();

//Manitoba
function fetchManSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-manitoba/"
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
          formatSchoolObjectPt(school, "Manitoba", "Manitoba")
        );
      });
    })
    .then((data) => {
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/singing/pt/mb.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchManSchools();

//Ontario
function fetchONSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-toronto/"
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
          formatSchoolObjectPt(school, "Ontario", "Toronto")
        );
      });
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-etobicoke-mississauga/"
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
              formatSchoolObjectPt(school, "Ontario", "Etobicoke, Mississauga")
            );
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-oakville-milton/"
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
              "Oakville, Milton"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-vaughan-richmond-hill-markham/"
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
              "Vaughan, Richmond Hill, Markham"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-gta-east/"
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
              "GTA East"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-gta-north/"
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
              "GTA North"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-gta-northwest/"
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
              "GTA Northwest"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-gta-southwest/"
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
              "GTA Southwest"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-ottawa/"
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
            const newSchool = formatSchoolObjectPt(school, "Ontario", "Ottawa");
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-london-area/"
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
              "London (and Area)"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-gta-west/"
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
              "Kitchener (and Area)"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-northeast/"
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
              "Ontario Northeast"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-southeast/"
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
              "Ontario Southeast"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-northwest/"
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
              "Ontario Northwest"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-ontario/part-time-singing-ontario-southwest/"
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
              "Ontario Southwest"
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
          "./captured-data/singing/pt/on.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 4000);
    });
}

fetchONSchools();

//Quebec
function fetchQBSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-quebec/part-time-singing-quebec-montreal/"
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
          formatSchoolObjectPt(school, "Québec", "Montréal")
        );
      });
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-quebec/part-time-singing-quebec-quebec-and-area/"
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
              formatSchoolObjectPt(school, "Québec", "Québec and Area")
            );
          });
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-quebec/part-time-singing-quebec-longueuil-and-area/"
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
              "Québec",
              "Longueuil and Area"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-quebec/part-time-singing-quebec-montreal-area-west/"
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
              "Québec",
              "Montréal Area (West)"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-quebec/part-time-singing-quebec-montreal-area-east/"
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
              "Québec",
              "Montréal Area (East)"
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
          "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-singing-quebec/part-time-singing-quebec-other/"
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
            const newSchool = formatSchoolObjectPt(school, "Québec", "Other");
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
          "./captured-data/singing/pt/qu.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 3000);
    });
}

fetchQBSchools();

//New Brunswick
function fetchNBSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-new-brunswick-singing/"
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
          "New Brunswick",
          "New Brunswick"
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
          "./captured-data/singing/pt/nb.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchNBSchools();

//Nova Scotia
function fetchNSSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-nova-scotia-singing/"
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
          "./captured-data/singing/pt/ns.json",
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

//Newfoundland
function fetchNFLchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-newfoundland-singing/"
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
          "Newfoundland",
          "Newfoundland"
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
          "./captured-data/singing/pt/nfl.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchNFLchools();

//PEI
function fetchPEISchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/singing/part-time-singing-training/part-time-pei-singing/"
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
          "Prince Edward Island",
          "Prince Edward Island"
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
          "./captured-data/singing/pt/pei.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchPEISchools();
