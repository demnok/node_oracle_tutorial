var express = require('express');
var app = express();
var sworm = require('sworm');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

var ORACLE_DB_CONFIG = {
  driver: 'oracle',
  config: {
    user: 'student',
    password: 'STUDENT',
    connectString: 'localhost:49161/XE'
  }
};

var db = sworm.db(ORACLE_DB_CONFIG);

app.get('/welcome', function(req, res) {
  res.send('Something has been sent');
});

app.get('/users', function(req, res) {
  db.query('select * from users').then(function(data) {
    res.send(data);
  }, function(err) {
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Uh-oh",
      detailed_message: err.message
    }));
  });
});

app.get('/fake_news', function(req, res) {
  db.query('select * from you_are_fake_news').then(function(data) {
    res.send(data);
  }, function(err) {
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Uh-oh",
      detailed_message: err.message
    }));
  });
});

app.listen(3004, function() {
  console.log('My app has been opened? on port 3004');
})
