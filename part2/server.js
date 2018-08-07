var express = require('express');
var app = express();
var fs = require('fs')
var port = process.env.PORT || 8000;



// ### Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.
app.get('/', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) { //want to read the file by "fs.readFile"
    res.json(JSON.parse(data)); //'JSON.parse(data)' makes it a valid javascript array
  })
})
//REMINDER - 'fs.readFile' makes it a big string
//'JSON.parse', parses it to make a  valid javascript array



// ### Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name. If there
// is no object in storage.json that matches then return a 400 status.
app.get('/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) { //first we wan to read the file "fs.readFile"
    let parsedData = JSON.parse(data); //'JSON.parse' - parses the data into a valid javascipt array
    let matchedUser = parsedData.filter((item) => {
      return item.name == req.params.name; //if we find a user with the same name, then return them
    });

    if (matchedUser.length >= 1) { //grabbing only '1 user' that matches 
      res.json(matchedUser[0]);
    } else {
      res.sendStatus(400);
    }
  })
})


// ### Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this:
// {
//   "name": "troy",
//   "age": 20
// }
// Then take that object and insert it into storage.json
app.post('/create/:name/:age', function(req, res) {
  let newObj = {
    name: req.params.name,
    age: parseInt(req.params.age) //parseInt - parses a string argument and returns an integer of the specified
    //radix (the base in mathematical numeral systems).
  }

  fs.readFile('./storage.json', 'utf8', function(err, data) { //parse the data into a  valid javascript array
    let dataAsArr = JSON.parse(data);

    dataAsArr.push(newObj); //push the data into the 'newObj'

    fs.writeFile('./storage.json', JSON.stringify(dataAsArr), function(err) { //using 'asynchronous' version on 'writeFile'
      res.sendStatus(200); //'json.stringify' to convert data in an array
    })
  })
});





app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});