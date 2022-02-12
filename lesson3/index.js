const fs = require("fs");
// const fs = require("fs/promises");
const { Transform } = require("stream");

const ACCESS = "./access.log";
const TEST = "./test.log";

// fs.readFile(ACCESS, "utf-8", (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// // });
// fs.readFile(ACCESS, { encoding: "utf-8" }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });

//вариант с промисами
// fs.readFile(ACCESS, "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const requests = [
  '127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"',
  '127.0.0.1 - - [30/Jan/2021:11:11:25 -0300] "GET /boo HTTP/1.1" 404 0 "-" "curl/7.47.0"',
];

// fs.writeFile(
//   ACCESS,
//   requests[1] + "\n",
//   { encoding: "utf-8", flag: "a" },
//   (err) => {
//     if (err) console.log(err);
//   }
// );
//добавление данных в конец файла
// fs.appendFile(ACCESS, requests[1] + "\n", { encoding: "utf-8" }, (err) => {
//   if (err) console.log(err);
// });

//чтение потока
// const readStream = fs.createReadStream(ACCESS, {
//   encoding: "utf-8",
//   // autoClose,
//   // start
//   // end
//   highWaterMark: 64,
// });

// //наиболее часто используемые события readStream
// readStream.on("data", (chunk) => {
//   console.log("chunk:", chunk);
// });
// readStream.on("end", () => {
//   console.log("There will be no more data.");
// });
// readStream.on("error", () => {
//   console.log(err);
// });

//запись потоком
// const writeStream = fs.createWriteStream(ACCESS, {
//   flags: "a",
//   encoding: "utf-8",
// });

// requests.forEach((logString) => {
//   writeStream.write(logString + "\n");
// });

const payedAccount = true;

const readStream = fs.createReadStream(ACCESS);
const tStream = new Transform({
  transform(chunk, encoding, callback) {
    if (!payedAccount) {
      const transformed = chunk
        .toString()
        .replace(/\d+\.\d+\.\d+\.\d+/g, "[Hidden IP]");
      this.push(transformed);
    } else {
      this.push(chunk);
    }

    callback();
  },
});

const writeStream = fs.createWriteStream(TEST, {
  flags: "a",
  encoding: "utf-8",
});

// requests.forEach((logString) => {
//   writeStream.write(logString + "\n");
// });

readStream.pipe(tStream).pipe(writeStream);
