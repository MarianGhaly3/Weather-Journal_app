
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// define the main project folder
app.use(express.static('website'));


/*Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors= require('cors');
app.use(Cors());


// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`server is running on localhost: ${port}`);
};


// POST Route 
const data = [];
app.post('/add', addData);

// Callback function to POST data
function addData(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// Callback function to Get data
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
  console.log(projectData);

}

