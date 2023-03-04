import axios from "axios";
import fs from "fs";
import {
  makeSchoolsArray,
  formatSchoolObject,
  findContent,
} from "./helpers.js";

//BC

axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-bc/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "British Columbia"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/bc.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

// //Alberta
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-alberta/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Alberta"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/ab.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Saskatchewan
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-manitoba-saskatchewan/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);
    const albertaContent = noTitle.slice(0, noTitle.indexOf("Manitoba"));

    const schoolsList = makeSchoolsArray(albertaContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Saskatchewan"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/sask.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//MANITOBA
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-manitoba-saskatchewan/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);
    const manitobaContent = contentSection.slice(
      contentSection.indexOf("<h4>Manitoba</h4>")
    );
    const schoolsList = makeSchoolsArray(manitobaContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Manitoba"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/man.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Ontario
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-ontario/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Ontario"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/on.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Quebec
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-quebec/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Québec"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/qu.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//New Brunswick
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-new-brunswick-nova-scotia/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);
    const albertaContent = noTitle.slice(0, noTitle.indexOf("Nova Scotia"));

    const schoolsList = makeSchoolsArray(albertaContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "New Brunswick"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/nb.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Nova Scotia
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-new-brunswick-nova-scotia/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);
    const manitobaContent = contentSection.slice(
      contentSection.indexOf("<h4>Nova Scotia</h4>")
    );
    const schoolsList = makeSchoolsArray(manitobaContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Nova Scotia"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/ns.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//Newfoundland
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-newfoundland-prince-edward-island/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);
    const albertaContent = noTitle.slice(
      0,
      noTitle.indexOf("Prince Edward Island")
    );

    const schoolsList = makeSchoolsArray(albertaContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Newfoundland"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/nfl.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//PEI
axios
  .get(
    "https://www.iwanttobeaperformer.ca/acting-2/full-time-acting-training/full-time-acting-newfoundland-prince-edward-island/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);
    const manitobaContent = contentSection.slice(
      contentSection.indexOf("<h4>Prince Edward Island</h4>")
    );
    const schoolsList = makeSchoolsArray(manitobaContent);
    for (let i = 0; i < schoolsList.length; i++) {
      if (!schoolsList[i].includes("<strong>")) {
        schoolsList.splice(i, 1);
      }
    }
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Prince Edward Island"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/act/ft/pei.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });
