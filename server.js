const express = require("express");
const cors = require("cors");
const lodash = require("lodash");
const { response, request } = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true }))

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
    id: lodash.uniqueId(),
    from: request.body.from,
    text: request.body.text,
  };
  messages.push(newMessage);
  response.json(messages);
});

// Get message by ID
app.get("/messages/:id", function (request, response) {
  const inputId = request.params.id;
  const found = messages.some((el) => el.id === parseInt(inputId));
  console.log(inputId);
  if (found) {
    const message = messages.filter((el) => el.id === parseInt(inputId));
    response.json(message);
  } else {
    response.status(400).json({ msg: `Id of ${inputId} not found` });
  }
});

app.delete("/messages/:id", function (request, response) {
  const {id} = request.params;
  const match = messages.some(message => message.id === parseInt(id));
  if(match) {
    const deleteMessage = messages.filter(message => message.id === parseInt(id))
    response.json({ msg: `message with id of ${id} is deleted`, messages : deleteMessage}); 
  }else {
    response.status(400).json({ msg: `Id of ${id} not found` })
  }
})

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
