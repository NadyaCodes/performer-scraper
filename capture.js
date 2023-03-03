const { default: axios } = require("axios");
const fs = require("fs");

const findProvince = (string) => {
  let finalString = "";
  let i = 3;
  while (string[i] !== "<") {
    finalString += string[i];
    i++;
  }
  return finalString;
};

const makeSchoolsArray = (string) => {
  let i = 0;
  let finalArray = [];
  let dataString = "";

  while (i < string.length) {
    dataString += string[i];
    if (dataString.includes("<p>&nbsp;</p>")) {
      finalArray.push(dataString);
      dataString = "";
    }
    i++;
  }

  return finalArray;
};

const formatSchoolObject = (string, province) => {
  const schoolObj = {};

  //SELECT NAME AND CITY
  const schoolTitleBegin = string.indexOf("<strong>") + 8;
  const schoolTitleEnd = string.indexOf("</strong>") - 2;
  let cityString = "";
  let endIndex = schoolTitleEnd;

  while (string[endIndex] !== "(") {
    cityString = string[endIndex] + cityString;
    endIndex--;
  }
  schoolObj.city = cityString;

  let title = string.slice(schoolTitleBegin, endIndex);
  if (title.includes("&nbsp;")) {
    let end = title.indexOf("&");
    title = title.slice(0, end - 1);
  }
  if (title[title.length - 1] === " ") {
    title = title.slice(0, title.length - 1);
  }
  schoolObj.name = title;

  //FIND WEBSITE
  let linkFinal = "";
  let linkEnd;
  if (string.includes("href")) {
    let linkBegin = string.indexOf("href");
    linkEnd = string.indexOf("</a>");
    let j = linkBegin + 6;

    while (string[j] !== '"') {
      linkFinal += string[j];
      j++;
    }
  } else if (string.includes("http")) {
    let linkBegin = string.indexOf("http");
    linkEnd = linkBegin;
    while (string[linkEnd] !== "<") {
      linkEnd++;
    }
    let j = linkBegin;

    while (string[j] !== "<") {
      linkFinal += string[j];
      j++;
    }
  }

  schoolObj.website = linkFinal;

  //FIND PROGRAMS
  const schoolPrograms = [];
  let currentIndex = linkEnd;

  let findInfo = "";
  while (!findInfo.includes("<p>")) {
    findInfo += string[currentIndex];
    currentIndex++;
  }

  let programsData = string.slice(currentIndex - 3);

  const extras = {
    "<i>": "",
    "</i>": "",
    "</em>": "",
    "<em>": "",
    "<p>&nbsp;</p>": "",
    "&nbsp;": "",
    "<p>": "",
    "</p>": "|",
    "<br />": "",
    "\n": "",
    "<": "",
    " – ": ": ",
  };

  Object.keys(extras).forEach((key) => {
    programsData = programsData.replaceAll(key, extras[key]);
  });

  let programDataIndex = 0;
  let currentProgram = "";
  while (programDataIndex < programsData.length) {
    if (programsData[programDataIndex] === "|") {
      schoolPrograms.push(currentProgram);
      currentProgram = "";
    } else {
      currentProgram += programsData[programDataIndex];
    }
    programDataIndex++;
  }

  //SEE ALSO CREATE
  let seeAlso;
  if (schoolPrograms[schoolPrograms.length - 1].includes("See also:")) {
    let seeAlsoText = schoolPrograms[schoolPrograms.length - 1];
    let alsoIndex = seeAlsoText.indexOf(":");
    alsoIndex++;
    let categoryString = seeAlsoText.slice(alsoIndex + 1);
    let categoryArray = categoryString.split(", ");
    seeAlso = categoryArray;
    schoolPrograms.pop();
  }

  schoolObj.programs = schoolPrograms;
  schoolObj.province = province;

  seeAlso && (schoolObj.alts = seeAlso);

  return schoolObj;
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
