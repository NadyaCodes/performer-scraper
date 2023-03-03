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
    "https://www.iwanttobeaperformer.ca/full-time-dance-training/full-time-dancing-bc/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "British Columbia"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/dance/ft/bc.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//ALBERTA
axios
  .get(
    "https://www.iwanttobeaperformer.ca/full-time-dance-training/full-time-dancing-alberta-manitoba/"
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
      formattedSchools.push(formatSchoolObject(school, "Alberta"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/dance/ft/ab.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//MANITOBA
axios
  .get(
    "https://www.iwanttobeaperformer.ca/full-time-dance-training/full-time-dancing-alberta-manitoba/"
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

    fs.writeFile("./captured-data/dance/ft/man.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//ONTARIO
axios
  .get(
    "https://www.iwanttobeaperformer.ca/full-time-dance-training/full-time-dancing-ontario/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Ontario"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/dance/ft/on.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//QUEBEC
axios
  .get(
    "https://www.iwanttobeaperformer.ca/full-time-dance-training/full-time-dancing-quebec/"
  )
  .then((data) => {
    const contentSection = findContent(data.data);

    const startIndex = contentSection.indexOf("<strong>");
    const noTitle = contentSection.slice(startIndex);

    const schoolsList = makeSchoolsArray(noTitle);
    const formattedSchools = [];

    schoolsList.forEach((school) => {
      formattedSchools.push(formatSchoolObject(school, "Québec"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/dance/ft/qu.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//PEI
axios
  .get(
    "https://www.iwanttobeaperformer.ca/full-time-dance-training/full-time-dancing-pei/"
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
      formattedSchools.push(formatSchoolObject(school, "PEI"));
    });

    let dataArray = [...formattedSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/dance/ft/pei.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });
