// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const ejs = require('ejs');
const fs = require('fs');

// Create a new express app
const app = express();

// Use body-parser middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: false }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'expressdb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});


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

app.get('/user', (req, res) => {
  res.render('crud/users');
});

// Get All Users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Create User
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('User created successfully');
  });
});

// Update User
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const sql = `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('User updated successfully');
  });
});

// Delete User
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('User deleted successfully');
  });
});




// Get All User API
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
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
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


