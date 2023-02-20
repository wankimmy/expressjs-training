// Import required modules
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

// Create a new express app
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/registration', (req, res) => {
  res.render('registration');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', function(req, res) {
  var data = {
    lat: 3.0652,
    lng: 101.4832
  };
  res.render('contact', { data: data });
});

app.get("/list_movies", (req, res) => {
  fs.readFile(__dirname + '/' + 'json/movies.json', 'utf8', (err, data) => {
    res.end(data);
  });
});

// FS Method
// app.get('/some/route', function(req, res) {
//   fs.readFile('path/to/your/file.txt', 'utf8', function(err, data) {
//     if (err) throw err;
//     res.render('your-template', { fileContents: data });
//   });
// });


// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
