const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const isFile = (path) => fs.lstatSync(path).isFile();
const server = http.createServer((req, res) => {
  // const filePath = path.join(__dirname, "/index.html");
  const fullFilePath = path.join(process.cwd(), req.url);

  if (!fs.existsSync(fullFilePath)) {
    return res.end("File or directory not found");
  }

  if (isFile(fullFilePath)) {
    return fs.createReadStream(fullFilePath).pipe(res);
  }

  const list = fs.readdirSync(fullFilePath);
  let linkList = "";
  list.forEach((fileName) => {
    const filePath = path.join(req.url, fileName);
    linkList += `<li><a href="${filePath}">${fileName}</a></li>`;
  });

  res.writeHead(200, "OK!", { "Content-Type": "text/html" });
  res.end(linkList);
});

server.listen(5555);
