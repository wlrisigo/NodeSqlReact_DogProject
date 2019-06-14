process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const config = require('config');
const dogs = require('./routes/dogs');
const person = require('./routes/person');
const tags = require('./routes/tags');
const dogtag = require('./routes/dogtag');
const auth = require('./routes/auth');
const news = require('./routes/news');
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const user = require('./routes/user')
var fs = require('fs');
var util = require('util');

//Connecting To port Number
if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

/*          For console.log on Silk      */
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
// Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

// app.get("/", (req, res)=>{
//     var currentdate = new Date();
//     var datetime = "Last Sync: " + currentdate.getDate() + "/"
//         + (currentdate.getMonth()+1)  + "/"
//         + currentdate.getFullYear() + " @ "
//         + currentdate.getHours() + ":"
//         + currentdate.getMinutes() + ":"
//         + currentdate.getSeconds();
//     console.log(datetime);
//     res.send(datetime);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', user);
app.use('/api/dogs', dogs);
app.use('/api/person', person);
app.use('/api/tags', tags)
app.use('/api/dogtag', dogtag);
app.use('/api/news', news);
app.use('/api/auth', auth);

//app.use('/OurDogs', status);

console.log(config.get('env.jwt.jwtPrivateKey'));
//is configuration defined?
if (!config.get('env')) {
    console.error('FATAL ERROR: Enviorment is not defined.');
    process.exit(1);
}

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

//connect to database with set configuration

db.connect(config.get('env'));

// Handles any requests that don't match the ones above

//const port = process.env.PORT || 3000;
if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(3000);
}