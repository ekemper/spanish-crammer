var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var config = require('./config'); // get our config file

var apiRoutes = require('./routers/apiRouter.js');
var definitionsRoutes = require('./routers/definitionsRouter');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || config.database, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


app.use('/api', apiRoutes);

app.use('/definition', definitionsRoutes);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});