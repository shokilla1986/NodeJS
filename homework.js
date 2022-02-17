#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const readLine = require("readline");
const inquirer = require("inquirer");

//creatin options for work with files
const options = yargs
  .option("p", {
    alias: "path",
    describe: "path to the file",
    type: "string",
    default: process.cwd(),
  })
  .option("r", {
    alias: "regExp",
    describe: "regExp for the file",
    type: "string",
  }).argv;

//creating choises from file
let executionDir = options.p;
const fileFilter = (fileOrDir) => fs.statSync(fileOrDir).isFile();

//
function inquirerFunc() {
  const list = fs.readdirSync(executionDir);
  const file = inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Enter the file to reading",
        choices: list,
      },
    ])
    .then(({ fileName }) => {
      let fullFilePath = path.join(executionDir, fileName);

      if (fileFilter(fullFilePath)) {
        fs.readFile(fullFilePath, "utf-8", (err, data) => {
          if (err) console.log(err);
          if (options.r == null) {
            console.log(data);
          } else {
            const regExp = new RegExp(options.r, "igmu");
            console.log(data.match(regExp));
          }
        });
      } else {
        executionDir = fullFilePath;
        inquirerFunc();
      }
    });
}

inquirerFunc();
