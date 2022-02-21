const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const os = require("os");
const cluster = require("cluster");

// const server = http.createServer((req, res) => {
//   //starting
//   //   console.log("Request!");
//   //   //   res.write("Hello");
//   //   res.end("hello world");
//   //request methods
//   //   console.log("url:", req.url);
//   //   console.log("method:", req.method);
//   //   console.log("headers:", req.headers);
//   //response methods
//   //   res.setHeader("test-header", "test");
//   //   res.writeHead(200, "OK!", {
//   //     "test-header": "test",
//   //     "test-header1": "test",
//   //     "test-header2": "test",
//   //     "test-header3": "test",
//   //   });
//   //Routing
//   //URl
//   //   if (req.url === "/user") {
//   //     res.end("User found");
//   //   } else {
//   //     res.writeHead(404, "User not found =(", {
//   //       "test-hesder": "test-test",
//   //     });
//   //     res.end("User not found");
//   //   }
//   //METHOD
//   //   if (req.method === "GET") {
//   //     res.end("HEllo");
//   //   } else {
//   //     res.writeHead(405, "Method not found =(", {
//   //       "test-hesder": "test-test",
//   //     });
//   //     res.end("Method not Allowed");
//   //   }
//   // get parameters from url
//   // const { query } = url.parse(req.url, true);
//   // console.log(query);

//   //get parameters from body
//   // if (req.method === "POST") {
//   //   let data = "";
//   //   req.on("data", (chunk) => (data += chunk));
//   //   req.on("end", () => {
//   //     console.log(data);
//   //     const parseData = JSON.parse(data);
//   //     console.log(parseData);
//   //     res.writeHead(200, { "Content-Type": "json" });
//   //     res.end(data);
//   //   });
//   // } else {
//   //   res.end();
//   // }

//   //sending files on client
//   const filePath = path.join(__dirname, "index.html");
//   const readStream = fs.createReadStream(filePath);
//   res.writeHead(200, "OK!", { "Content-Type": "text/html" });
//   readStream.pipe(res);
// });

// server.listen(5555);

//multy-streams server
// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running...`);

//   for (let i = 0; i < os.cpus().length; i++) {
//     console.log(`Forking process number ${i}`);
//     cluster.fork();
//   }
// } else {
//   console.log(`Worker ${process.pid} is running...`);

//   const server = http.createServer((req, res) => {
//     setTimeout(() => {
//       console.log(`Worker ${process.pid} handling request`);
//       const filePath = path.join(__dirname, "index.html");
//       const readStream = fs.createReadStream(filePath);

//       res.writeHead(200, "OK!", { "Content-Type": "text/html" });
//       readStream.pipe(res);
//     }, 5000);
//   });
//   server.listen(5555);
// }
