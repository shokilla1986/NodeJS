//import modules
const fs = require("fs");
const stream = require("stream");
const { Transform } = require("stream");
//path to files for my test
const ACCESS_LOG = "./accessTest.log";
const TEST = "./test.log";
const TEST2 = "./test2.log";

//creatind const of methods
const readStream = fs.createReadStream(ACCESS_LOG, {
  encoding: "utf-8",
  //   highWaterMark: 64,
});
const writeStream1 = fs.createWriteStream(TEST, {
  encoding: "utf-8",
  flags: "a",
});
const writeStream2 = fs.createWriteStream(TEST2, {
  encoding: "utf-8",
  flags: "a",
});

//regExp
// const regExp1 = /127.0.0.1/;
// const regExp2 = /123.0.0.1/;
// const regExp3 = /$/g;
const regExp1 = new RegExp(/127.0.0.1/, "g");
const regExp2 = new RegExp("127.0.0.1", "g");
let requests = [];

//events
readStream.on("data", (chunk) => {
  chunk.split(/\\n/);
  requests.push(chunk);

  requests.forEach((logString) => {
    if (regExp1.test(logString)) {
      writeStream1.write(logString + "\n");
    }
    if (regExp2.test(logString)) {
      writeStream2.write(logString + "\n");
    }
  });
  //   if (regExp1.test(chunk)) {
  //     writeStream1.write(chunk + "\n");
  //   }
  //   if (regExp2.test(chunk)) {
  //     writeStream2.write(chunk + "\n");
  //   }
});
readStream.on("end", () => {
  console.log("There will be no more data.");
});
readStream.on("error", () => {
  console.log(err);
});

console.log(requests);
//попытка через конвейер записать - неудачно)
// const tStream = new Transform({
//   transform(chunk, encoding, callback) {
//     const transformed = chunk.toString();

//     if (regExp3.test(transformed)) {
//       this.push(transformed);
//     }
//     callback();
//   },
// });
// const tStream2 = new Transform({
//   transform(chunk, encoding, callback) {
//     const transformed = chunk.toString();

//     if (regExp1.test(transformed)) {
//       this.push(transformed);
//     }
//     callback();
//   },
// });

// const writeStream = fs.createWriteStream(TEST, {
//   flags: "a",
//   encoding: "utf-8",
// });

// readStream.pipe(tStream).pipe(tStream2).pipe(writeStream);
