const express = require("express");
const path = require("path");
const http = require("http");
const sockets = require("./sockets");

const app = express();
const server = http.createServer(app);
sockets.init(server);

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => console.log("listening on port " + PORT));
