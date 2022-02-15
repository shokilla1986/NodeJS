#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
// const yargs = require("yargs");
const readLine = require("readline");
const inquirer = require("inquirer");

// const [filePath] = process.argv.slice(2);

// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });

//modules yargn and path
// const options = yargs.usage("Usage: -p <path to file>").option("p", {
//   alias: "path",
//   describe: "path to the file",
//   type: "string",
//   demandOption: true,
// }).argv;

// const filePath = path.join(__dirname, options.p);

// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });
// console.log(options);

//module readline
// const rl = readLine.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Please, enter the path to the file:", (filePath) => {
//   const fullFilePath = path.join(__dirname, filePath);
//   rl.question("Please enter the encode to the file:", (encode) => {
//     fs.readFile(fullFilePath, encode, (err, data) => {
//       if (err) console.log(err);
//       console.log(data);
//     });

//     rl.close();
//   });
// });

//creating call chain using promices
// const question = async (query) =>
//   new Promise((resolve) => rl.question(query, resolve));

// (async () => {
//   const filePath = await question("Please, enter the path to the file:");
//   const encode = await question("Please enter the encode to the file:");
//   // const fullFilePath = path.join(__dirname, filePath);
//   const fullFilePath = path.resolve(__dirname, filePath);
//   console.log(fullFilePath);

//   fs.readFile(fullFilePath, encode, (err, data) => {
//     if (err) console.log(err);
//     console.log(data);
//   });

//   rl.close();
// })();

//module inqurer
const executionDir = process.cwd();
const fileFilter = (fileOrDir) => fs.statSync(fileOrDir).isDirectory();
const list = fs.readdirSync("./").filter(fileFilter);
inquirer
  .prompt([
    {
      name: "fileName",
      type: "list",
      message: "Enter the file to reading",
      choices: list,
    },
  ])
  .then(({ fileName }) => {
    const fullFilePath = path.join(executionDir, fileName);

    fs.readFile(fullFilePath, "utf-8", (err, data) => {
      if (err) console.log(err);
      console.log(data);
    });
  });
