const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // for parsing application/json
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

// All
app.get("/messages", function (request, response) {
  response.send(messages);
});

// Home page
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Create a message
app.post("/messages", function (request, response) {
  const newMessage = {
    id: request.body.id,
    from: request.body.from,
    text: request.body.text,
  };
  messages.push(newMessage);
  response.json(messages);
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
