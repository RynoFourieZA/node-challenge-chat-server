const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// All
app.get("/messages", (response, request) => {
  response.send(messages);
});

// app.post
app.post("/message", (response, request) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
