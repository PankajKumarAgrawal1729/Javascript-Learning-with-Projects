// Node Server which will handle socket.io connections
import express from "express";
const app = express();
const bodyParser = require("body-parser");
const io = require("socket.io")(8000);

const users = {};
app.set("view-engine", ejs);
app.use(express.static("public"));


//listen all socket connect
io.on("connection", (socket) => {
  //handle that particular socket event
  socket.on("new-user-joined", (name) => {
    // console.log("New User", name);
    users[socket.id] = name;
    //broadcast a event to all the users except the user who triggered
    socket.broadcast.emit("user-joined", name);
  });

  //if message is send by someone
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  //if someone left the chat
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

app.listen()
