export function findContent(string) {
  const firstIndex = string.indexOf("entry-content");
  const slicedPage = string.slice(firstIndex);
  const endIndex = slicedPage.indexOf("</div");
  return slicedPage.slice(0, endIndex);
}

export function makeSchoolsArray(string) {
  let i = 0;
  let finalArray = [];
  let dataString = "";

  while (i < string.length) {
    dataString += string[i];
    if (
      dataString.includes("&nbsp;</p>") ||
      dataString.includes(">&nbsp;<br />")
    ) {
      finalArray.push(dataString);
      dataString = "";
    }
    i++;
  }
  if (dataString.length > 0 && dataString.includes("</p>\n")) {
    finalArray.push(dataString);
  }

  return finalArray;
}

export function formatSchoolObject(string, province) {
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
    title = title.slice(0, end);
  }
  if (title[title.length - 1] === " ") {
    title = title.slice(0, title.length - 1);
  }

  if (title[title.length - 1] === "&") {
    title = title.slice(0, title.length - 1);
  }

  if (title.includes("’")) {
    title = title.replace("’", "'");
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
    "&amp;": "&",
    "&#8211;": "-",
    "<p>": "",
    "</p>": "|",
    "<br />": "",
    "\n": "",
    "<": "",
    " – ": ": ",
    "’": "'",
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
  if (
    schoolPrograms.length > 0 &&
    (schoolPrograms[schoolPrograms.length - 1].includes("See also:") ||
      schoolPrograms[schoolPrograms.length - 1].includes("See Also:"))
  ) {
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
}
