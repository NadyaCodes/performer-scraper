import axios from "axios";
import fs from "fs";
import {
  makeSchoolsArray,
  findContent,
  formatSchoolObjectPt,
} from "./helpers.js";

axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-bc/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("</h1>");
    const noTitle = contentSection.slice(startIndex);

    // console.log(noTitle);
    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("href")) {
        schoolsList.splice(i, 1);
      }
    }

    // console.log(schoolsList);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      const newSchool = formatSchoolObjectPt(
        school,
        "British Columbia",
        "British Columbia"
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

    // console.log(formattedSchools);

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/bc.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Quebec
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-quebec/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("</h1>");
    const noTitle = contentSection.slice(startIndex);

    // console.log(noTitle);
    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("href")) {
        schoolsList.splice(i, 1);
      }
    }

    // console.log(schoolsList);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObjectPt(school, "Québec", "Québec"));
    });

    // console.log(formattedSchools);

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/qu.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Alberta
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-alberta/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("</h1>");
    const noTitle = contentSection.slice(startIndex);

    // console.log(noTitle);
    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("href")) {
        schoolsList.splice(i, 1);
      }
    }

    // console.log(schoolsList);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObjectPt(school, "Alberta", "Alberta"));
    });

    // console.log(formattedSchools);

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/ab.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Manitoba
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-manitoba-saskatchewan/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("</h3>");
    const noTitle = contentSection.slice(startIndex);

    const firstProvContent = noTitle.slice(
      0,
      noTitle.indexOf("<h3>Saskatchewan</h3>")
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
        formatSchoolObjectPt(school, "Manitoba", "Manitoba")
      );
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/man.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Sask
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-manitoba-saskatchewan/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);
    const secondProvContent = contentSection.slice(
      contentSection.indexOf("<h3>Saskatchewan</h3>")
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
        formatSchoolObjectPt(school, "Saskatchewan", "Saskatchewan")
      );
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/sk.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Newfoundland
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-newfoundland-nova-scotia-pei/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<h3>Newfoundland</h3>");
    const noTitle = contentSection.slice(startIndex);

    const provContent = noTitle.slice(
      0,
      noTitle.indexOf("<h3>Nova Scotia</h3>")
    );

    const schoolsList = makeSchoolsArray(provContent);
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

    fs.writeFile("./captured-data/mt/pt/nfl.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Nova Scotia
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-newfoundland-nova-scotia-pei/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<h3>Nova Scotia</h3>");
    const noTitle = contentSection.slice(startIndex);

    const provContent = noTitle.slice(0, noTitle.indexOf("<h3>PEI</h3>"));
    const schoolsList = makeSchoolsArray(provContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("href")) {
        schoolsList.splice(i, 1);
      }
    }

    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(
        formatSchoolObjectPt(school, "Nova Scotia", "Nova Scotia")
      );
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/ns.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//PEI
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-newfoundland-nova-scotia-pei/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);
    const provContent = contentSection.slice(
      contentSection.indexOf("<h3>PEI</h3>")
    );

    const schoolsList = makeSchoolsArray(provContent);
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

    fs.writeFile("./captured-data/mt/pt/pei.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Ontario
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/part-time-musical-theatre-training/part-time-musical-theatre-ontario/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("</h1>");
    const noTitle = contentSection.slice(startIndex);

    // console.log(noTitle);
    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("href")) {
        schoolsList.splice(i, 1);
      }
    }

    // console.log(schoolsList);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObjectPt(school, "Ontario", "Ontario"));
    });

    // console.log(formattedSchools);

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/pt/on.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });
