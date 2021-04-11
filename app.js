/**
 * SETUP
 */
// Import libraries
const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
var upload = multer();

// Setup server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const port = process.env.port || 80;
app.set('view engine', 'jade');
app.use(express.static('src/public'));
app.use(upload.array());

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

/**
 * DATA
 */
 app.post('/getResults', (req, res) => {
     /*
    (async () => {
        var data = await hashtag.getHashtagsFromImage(req.files[0].buffer);
        res.send(JSON.stringify(data)); // Sends the results
        console.log("Results sent to page!");
    })()*/
    console.log(req.body);
    let data = "apple";
    res.send(JSON.stringify(data));
});

// Turns on Server
app.listen(port, function () {
    console.log("Server has started running on port: " + port);
});
