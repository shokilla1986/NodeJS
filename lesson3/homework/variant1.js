//import modules
const fs = require("fs");
const readline = require("readline");

//path to files for my test
// const ACCESS_LOG = "./accessTest.log";
// const TEST = "./test.log";
// const TEST2 = "./test2.log";

//path to files for homework
const ACCESS_LOG = "C:/Users/ebogu/Downloads/access.log";
const API_34_48_240_111_LOG = "./%34.48.240.111%_requests.log";
const API_89_123_1_41_LOG = "./%89.123.1.41%_requests.log";

//creatind const of methods
const readStream = fs.createReadStream(ACCESS_LOG, "utf-8");
const writeStream1 = fs.createWriteStream(API_34_48_240_111_LOG, {
  encoding: "utf-8",
  flags: "a",
});
const writeStream2 = fs.createWriteStream(API_89_123_1_41_LOG, {
  encoding: "utf-8",
  flags: "a",
});
const rl = readline.createInterface(readStream, writeStream1 || writeStream2);

//regExp
// const regExp = new RegExp(/127.0.0.1/, "g");
// const regExp = new RegExp("127.0.0.1", "g");
const regExp1 = /34.48.240.111/;
const regExp2 = /89.123.1.41/;
//events
rl.on("line", (line) => {
  if (regExp1.test(line)) {
    writeStream1.write(line + "\n");
  }
  if (regExp2.test(line)) {
    writeStream2.write(line + "\n");
  }
});
rl.on("close", () => {
  console.log("Операция закончена");
});
