/**
 * SETUP
 */
// Import libraries
const express = require("express");
const bodyParser = require("body-parser");

// Setup server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.port || 80;
app.set('view engine', 'jade');
app.use(express.static('src/public'));

/**
 * WEBPAGES
 */
// Default
app.get("/", function (req, res) {
    console.log(req.url + "@" + Date() + " User connected to the homepage");
    res.render('index');
});

// Appplication
app.get("/app", function (req, res) {
    console.log(req.url + "@" + Date() + " User requested to use application");
    res.render('app');
});

// Meet the Team
app.get("/about", function (req, res) {
    console.log(req.url + "@" + Date() + " User requested to use about");
    res.render('about');
});

// Turns on Server
app.listen(port, function () {
    console.log("Server has started running on port: " + port);
});

/**
 * DATA
 */