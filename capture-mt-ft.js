import axios from "axios";
import fs from "fs";
import { makeSchoolsArray, formatSchoolObject } from "./helpers.js";

const findProvince = (string) => {
  let finalString = "";
  let i = 3;
  while (string[i] !== "<") {
    finalString += string[i];
    i++;
  }
  return finalString;
};

//BC / ALBERTA

axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/full-time-musical-theatre-training/full-time-mt-alberta-bc/"
  )
  .then((data) => {
    const pageData = data.data;
    const firstIndex = pageData.indexOf("entry-content");
    const slicedPage = pageData.slice(firstIndex);
    const endIndex = slicedPage.indexOf("div");
    const contentSection = slicedPage.slice(0, endIndex);

    //start looking for content
    let currentContent = contentSection.slice(contentSection.indexOf("h4"));

    let firstProvince = findProvince(currentContent);

    let firstProvinceRemoved = currentContent.slice(
      currentContent.indexOf("<p>")
    );

    let secondProvinceIndex = firstProvinceRemoved.indexOf("h4");

    //Two sections
    let firstSection = firstProvinceRemoved.slice(0, secondProvinceIndex);
    let secondSection = firstProvinceRemoved.slice(secondProvinceIndex);
    let secondProvince = findProvince(secondSection);
    let secondProvinceRemoved = secondSection.slice(
      secondSection.indexOf("<p>")
    );

    let schoolsArray = makeSchoolsArray(secondProvinceRemoved);

    const firstData = formatSchoolObject(firstSection, firstProvince);
    let secondData = [];

    schoolsArray.forEach((school) => {
      if (school.includes("<strong>")) {
        let schoolInfo = formatSchoolObject(school, secondProvince);
        secondData.push(schoolInfo);
      }
    });

    let dataArray = [firstData, ...secondData];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/ft/bc-ab.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//ONTARIO
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/full-time-musical-theatre-training/full-time-musical-theatre-ontario/"
  )
  .then((data) => {
    const pageData = data.data;
    const firstIndex = pageData.indexOf("entry-content");
    const slicedPage = pageData.slice(firstIndex);
    const endIndex = slicedPage.indexOf("div");
    const contentSection = slicedPage.slice(0, endIndex);

    let currentContent = contentSection.slice(
      contentSection.indexOf("strong") - 1
    );
    const schoolsList = [];

    let i = 0;
    let dataString = "";

    while (i < currentContent.length) {
      dataString += currentContent[i];
      if (
        dataString.includes("<p>&nbsp;<br />\n") ||
        dataString.includes("&nbsp;</p>\n")
      ) {
        schoolsList.push(dataString);
        dataString = "";
      }
      i++;
    }

    const allSchools = [];

    schoolsList.forEach((school) => {
      if (school.includes("<strong>")) {
        let schoolInfo = formatSchoolObject(school, "Ontario");
        allSchools.push(schoolInfo);
      }
    });

    let dataArray = [...allSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/ft/on.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//QUEBEC
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/full-time-musical-theatre-training/full-time-musical-theatre-quebec/"
  )
  .then((data) => {
    const pageData = data.data;
    const firstIndex = pageData.indexOf("entry-content");
    const slicedPage = pageData.slice(firstIndex);
    const endIndex = slicedPage.indexOf("div");
    const contentSection = slicedPage.slice(0, endIndex);

    let currentContent = contentSection.slice(
      contentSection.indexOf("strong") - 1
    );
    const schoolsList = [];

    let i = 0;
    let dataString = "";

    while (i < currentContent.length) {
      dataString += currentContent[i];
      if (dataString.includes("<p>&nbsp;</p>")) {
        schoolsList.push(dataString);
        dataString = "";
      }
      i++;
    }

    const allSchools = [];

    schoolsList.forEach((school) => {
      if (school.includes("<strong>")) {
        let schoolInfo = formatSchoolObject(school, "Québec");
        allSchools.push(schoolInfo);
      }
    });

    let dataArray = [...allSchools];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/ft/qu.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });

//EASTERN CANADA
axios
  .get(
    "https://www.iwanttobeaperformer.ca/musical-theatre/full-time-musical-theatre-training/full-time-musical-theatre-eastern-canada/"
  )
  .then((data) => {
    const pageData = data.data;
    const firstIndex = pageData.indexOf("entry-content");
    const slicedPage = pageData.slice(firstIndex);
    const endIndex = slicedPage.indexOf("div");
    const contentSection = slicedPage.slice(0, endIndex);

    //start looking for content

    //FIRST PROVINCE CONTENT
    let currentContent = contentSection.slice(contentSection.indexOf("h4"));
    let cleanerContent = currentContent.replaceAll("<h4></h4>\n", "");

    let firstProvince = findProvince(cleanerContent);
    let firstProvinceIndex = cleanerContent.indexOf(firstProvince);
    let currentIndex = firstProvinceIndex;

    let firstProvinceString = "";

    while (!firstProvinceString.includes("<p>&nbsp;</p>")) {
      firstProvinceString += cleanerContent[currentIndex];
      currentIndex++;
    }

    //SECOND PROVINCE CONTENTS
    let secondProvinceString = "";
    while (!secondProvinceString.includes("<p>&nbsp;</p>")) {
      secondProvinceString += cleanerContent[currentIndex];
      currentIndex++;
    }

    let secondProvince = findProvince(secondProvinceString.slice(2));
    let secondProvinceIndex = cleanerContent.indexOf(secondProvince);

    //THIRD PROVINCE CONTENTS
    let thirdProvinceString = "";
    while (!thirdProvinceString.includes("<p>&nbsp;</p>")) {
      thirdProvinceString += cleanerContent[currentIndex];
      currentIndex++;
    }

    let thirdProvince = findProvince(thirdProvinceString.slice(2));
    let thirdProvinceIndex = cleanerContent.indexOf(thirdProvince);

    //CREATE SECTIONS

    let firstSection = cleanerContent.slice(0, secondProvinceIndex);
    let secondSection = cleanerContent.slice(
      secondProvinceIndex,
      thirdProvinceIndex
    );
    let thirdSection = cleanerContent.slice(thirdProvinceIndex);

    const firstData = formatSchoolObject(firstSection, firstProvince);
    const secondData = formatSchoolObject(secondSection, secondProvince);
    const thirdData = formatSchoolObject(thirdSection, thirdProvince);

    let dataArray = [firstData, secondData, thirdData];
    let dataJSON = JSON.stringify(dataArray);

    fs.writeFile("./captured-data/mt/ft/east.json", dataJSON, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });
