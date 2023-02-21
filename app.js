// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

const ejs = require('ejs');
const fs = require('fs');

// Create a new express app
const app = express();

// Use body-parser middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON and URL-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(__dirname + '/public'));

var requestDate = function (req, res, next) {
 req.requestDate = Date()
 next()
}
app.use(requestDate);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/submitlogin', (req, res) => {
  const { username, password } = req.body;

  if (username != "admin") {
     res.render('error', { message: "Invalid Username, Please retry again" });
  }else if (password != "admin") {
     res.render('error', { message: "Invalid Password, Please retry again" });
  }else{
    res.render('home', { requestDate: req.requestDate, message: "Login Success !" });
  }
  
});

app.get('/home', (req, res) => {
  res.render('home', { requestDate: req.requestDate, message: "" });
});

app.get('/registration', (req, res) => {
  res.render('registration', { requestDate: req.requestDate });
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', function(req, res) {
  var data = {
    lat: 3.0652,
    lng: 101.4832
  };
  res.render('contact', { data: data, requestDate: req.requestDate });
});

app.get("/list_movies", (req, res) => {
  fs.readFile(__dirname + '/' + 'json/movies.json', 'utf8', (err, data) => {
    res.end(data);
  });
});

app.get('/form', (req, res) => {
  res.render('form');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;

  if (firstName && lastName) {
    res.send(`<h1>Thank you for submitting the form, ${firstName} ${lastName}!</h1>`);
  } else {
    res.send('<h1>Please enter your first name and last name.</h1>');
  }
});

app.get('/marks', (req, res) => {
  res.render('marks');
});

// POST route for /marks
app.post('/submitmarks', (req, res) => {
  const { name, math, english, computer } = req.body;
  const total = Number(math) + Number(english) + Number(computer);
  res.render('marks', { total: total, math: math, english: english, computer: computer, name: name });
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


