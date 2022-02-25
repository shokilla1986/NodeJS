const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");
const cli = require("nodemon/lib/cli");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(res);
});

const io = socket(server);
const usersMap = {};

io.on("connection", (client) => {
  console.log("connection");

  //save id
  usersMap[client.id] = {
    id: client.id,
  };
  //create username from id
  client.on("set username", (username) => {
    usersMap[client.id].username = username;
    client.broadcast.emit("NEW_CONN_EVENT", {
      message: `${usersMap[client.id].username} connected`,
      data: usersMap,
    });
    // client.broadcast.emit("server-clients-br", usersMap);
    client.emit("server-clients", usersMap);
  });

  //show clients
  // client.emit("server-clients", usersMap);

  //event message
  client.on("client-msg", (data) => {
    console.log(data);
    const payload = {
      message: data.message,
      name: data.name,
    };
    //online sending
    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });

  //event disconnect and remaining clients
  client.on("disconnect", () => {
    console.log("Disconnect");

    client.broadcast.emit("DIS_CONN_EVENT", {
      message: `${usersMap[client.id].username} disconnected`,
    });
    delete usersMap[client.id];

    client.broadcast.emit("server-clients", usersMap);
    client.emit("server-clients", usersMap);
  });
});

server.listen(5555);
