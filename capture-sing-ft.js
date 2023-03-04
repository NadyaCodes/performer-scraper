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
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-bc/"
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

    fs.writeFile(
      "./captured-data/singing/ft/bc.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//Alberta
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-alberta/"
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

    fs.writeFile(
      "./captured-data/singing/ft/ab.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//Saskatchewan
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-manitoba-saskatchewan/"
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

    fs.writeFile(
      "./captured-data/singing/ft/sask.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//MANITOBA
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-manitoba-saskatchewan/"
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

    fs.writeFile(
      "./captured-data/singing/ft/man.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//Ontario
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-ontario/"
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

    fs.writeFile(
      "./captured-data/singing/ft/on.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//Quebec
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-quebec/"
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

    fs.writeFile(
      "./captured-data/singing/ft/qu.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//New Brunswick
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-new-brunswick-nova-scotia/"
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

    fs.writeFile(
      "./captured-data/singing/ft/nb.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//Nova Scotia
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-new-brunswick-nova-scotia/"
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

    fs.writeFile(
      "./captured-data/singing/ft/ns.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//Newfoundland
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-newfoundland-pei/"
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

    fs.writeFile(
      "./captured-data/singing/ft/nfl.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });

//PEI
axios
  .get(
    "https://www.iwanttobeaperformer.ca/singing/full-time-singing-training/full-time-singing-newfoundland-pei/"
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

    fs.writeFile(
      "./captured-data/singing/ft/pei.json",
      dataJSON,
      function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      }
    );
  });
