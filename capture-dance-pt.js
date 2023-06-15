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
        const newSchool = formatSchoolObjectPt(
          school,
          "British Columbia",
          "Vancouver"
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
            const newSchool = formatSchoolObjectPt(
              school,
              "British Columbia",
              "Lower Mainland"
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
            const newSchool = formatSchoolObjectPt(
              school,
              "British Columbia",
              "Island"
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

          setTimeout(() => {
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
          }, 2000);
        })
    );
}

fetchBCSchools();

//Yukon
function fetchYukonSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-yukon/"
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
        formattedSchools.push(formatSchoolObjectPt(school, "Yukon", "Yukon"));
      });

      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);
        fs.writeFile(
          "./captured-data/dance/pt/yk.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 1000);
    });
}

fetchYukonSchools();

//Alberta
function fetchAlbertaSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-alberta/part-time-dance-alberta-calgary/"
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
        const newSchool = formatSchoolObjectPt(school, "Alberta", "Calgary");
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
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-alberta/part-time-dance-alberta-edmonton/"
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
              "Alberta",
              "Edmonton"
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
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-alberta/part-time-dance-alberta-other/"
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

          setTimeout(() => {
            let dataArray = [...formattedSchools];
            let dataJSON = JSON.stringify(dataArray);

            fs.writeFile(
              "./captured-data/dance/pt/ab.json",
              dataJSON,
              function (err) {
                if (err) throw err;
                console.log("File is created successfully.");
              }
            );
          }, 3000);
        })
    );
}

fetchAlbertaSchools();

//Saskatchewan
function fetchSaskSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-saskatchewan/"
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
          "Saskatchewan",
          "Saskatchewan"
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

      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);
        fs.writeFile(
          "./captured-data/dance/pt/sk.json",
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
function fetchManitobaSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-manitoba/"
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
        const newSchool = formatSchoolObjectPt(school, "Manitoba", "Manitoba");

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
      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);

        fs.writeFile(
          "./captured-data/dance/pt/mb.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchManitobaSchools();

//Ontario
function fetchOntarioSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-toronto/"
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
      // console.log("Toronto created");
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-gta-central/"
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
              "GTA Central"
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
          // console.log("GTA Central created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-gta-north-east/"
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
              "North/East GTA"
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
          // console.log("North/East GTA created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-kitchener-and-area/"
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
          // console.log("Kitchener (and Area) created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-hamilton-and-area/"
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
              "Hamilton (and Area)"
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
          // console.log("Hamilton (and Area) created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-ottawa/"
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
          // console.log("Ottawa created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-london-and-area/"
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
          // console.log("London (and Area) created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-south/"
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
              "Southern Ontario"
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
          // console.log("Southern Ontario created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-northwest/"
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
              "Northwest Ontario"
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
          // console.log("Northwest Ontario created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-northeast/"
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
              "Northeast Ontario"
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
          // console.log("Northeast Ontario created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-ontario/part-time-dance-ontario-gta-west/"
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
              formatSchoolObjectPt(school, "Ontario", "GTA West")
            );
          });

          // console.log("GTA West created");

          setTimeout(() => {
            let dataArray = [...formattedSchools];
            let dataJSON = JSON.stringify(dataArray);

            fs.writeFile(
              "./captured-data/dance/pt/on.json",
              dataJSON,
              function (err) {
                if (err) throw err;
                console.log("File is created successfully.");
              }
            );
          }, 3000);
        })
    );
}

fetchOntarioSchools();

//Quebec

//Ontario
function fetchQuebecSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-quebec/part-time-dance-quebec-montreal/"
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
      // console.log("Montreal created");
    })
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-quebec/part-time-dance-quebec-quebec/"
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
          // console.log("Quebec created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-quebec/part-time-dance-quebec-montreal-area-west/"
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
              "Montréal area (West)"
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
          // console.log("Montreal area (West) created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-quebec/part-time-dance-quebec-montreal-area-east/"
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
              "Montréal area (East)"
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
          // console.log("Montreal area (East) created");
        })
    )
    .then(
      axios
        .get(
          "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-quebec/part-time-dance-quebec-other/"
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
          // console.log("Quebec Other created");
          setTimeout(() => {
            let dataArray = [...formattedSchools];
            let dataJSON = JSON.stringify(dataArray);

            fs.writeFile(
              "./captured-data/dance/pt/qu.json",
              dataJSON,
              function (err) {
                if (err) throw err;
                console.log("File is created successfully.");
              }
            );
          }, 3000);
        })
    );
}

fetchQuebecSchools();

//New Brunswick
function fetchNBSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-new-brunswick/"
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

      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);
        fs.writeFile(
          "./captured-data/dance/pt/nb.json",
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
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-nova-scotia/"
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

      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);
        fs.writeFile(
          "./captured-data/dance/pt/ns.json",
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
function fetchNLDSchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-newfoundland/"
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

      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);
        fs.writeFile(
          "./captured-data/dance/pt/nfl.json",
          dataJSON,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }, 2000);
    });
}

fetchNLDSchools();

//PEI
function fetchPEISchools() {
  const formattedSchools = [];

  axios
    .get(
      "https://www.iwanttobeaperformer.ca/dance/part-time-dance-training/part-time-dance-pei/"
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

      setTimeout(() => {
        let dataArray = [...formattedSchools];
        let dataJSON = JSON.stringify(dataArray);
        fs.writeFile(
          "./captured-data/dance/pt/pei.json",
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
