import fs from "fs/promises";

const allProvs = [
  "ab",
  "bc",
  "bc-ab",
  "man",
  "mb",
  "nb",
  "nfl",
  "ns",
  "on",
  "pei",
  "qu",
  "sask",
  "sk",
  "yk",
  "east",
];

//ACTING

const findActFT = async () => {
  const actFTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/act/ft/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      actFTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return actFTobj;
};

const actFT = await findActFT();

const findActPT = async () => {
  const actPTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/act/pt/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      actPTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return actPTobj;
};

const actPT = await findActPT();

const allActing = { ft: actFT, pt: actPT };
// console.log("-----Acting-------");
// console.log(allActing);

//DANCE

const findDanceFT = async () => {
  const danceFTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/dance/ft/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      danceFTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return danceFTobj;
};

const danceFT = await findDanceFT();

const findDancePT = async () => {
  const dancePTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/dance/pt/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      dancePTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return dancePTobj;
};

const dancePT = await findDancePT();

const allDance = { ft: danceFT, pt: dancePT };
// console.log("-----Dance-------");
// console.log(allDance);

//MT

const findMtFT = async () => {
  const mtFTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/mt/ft/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      mtFTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return mtFTobj;
};

const mtFT = await findMtFT();

const findMtPT = async () => {
  const mtPTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/mt/pt/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      mtPTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return mtPTobj;
};

const mtPT = await findMtPT();

const allMT = { ft: mtFT, pt: mtPT };
// console.log("-----MT-------");
// console.log(allMT);

//Singing

const findSingFT = async () => {
  const singFTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/singing/ft/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      singFTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return singFTobj;
};

const singFT = await findSingFT();

const findSingPT = async () => {
  const singPTobj = {};

  for (const prov of allProvs) {
    try {
      const filePath = `./captured-data/singing/pt/${prov}.json`;
      const jsonData = await fs.readFile(filePath, "utf8");
      const currentPrograms = JSON.parse(jsonData);
      singPTobj[prov] = currentPrograms;
    } catch (error) {
      console.error(`An error occurred while importing ${prov}.json:`, error);
    }
  }

  return singPTobj;
};

const singPT = await findSingPT();

const allSing = { ft: singFT, pt: singPT };
// console.log("-----Sing-------");
// console.log(allSing);

const findAll = async () => {
  const finalObject = {};
  finalObject.act = allActing;
  finalObject.dance = allDance;
  finalObject.mt = allMT;
  finalObject.sing = allSing;

  return finalObject;
};

const allPrograms = await findAll();

// console.log("-----All-------");
// console.log(allPrograms);

let dataJSON = JSON.stringify(allPrograms);

fs.writeFile("./captured-data/allPrograms.json", dataJSON, function (err) {
  if (err) throw err;
  console.log("File is created successfully.");
});
