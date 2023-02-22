const express = require('express');
const { Client } = require('pg');
const axios = require('axios');

const connectionString = 'postgres://postgres:password@localhost:5432/mydatabase10';
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
const client = new Client({
    connectionString: connectionString
});


client.connect();
var app = express();
app.set('port', process.env.PORT || 4000);


// Get Employee API
app.get('/api/employee', (req, res) => {
client.query('SELECT * FROM Employee', function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});


app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4000/api/employee');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
});


app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});