require('dotenv').config();
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// main API endpoint
app.get("/api/whoami", function (req, res) {
  let ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let language = req.headers["accept-language"];
  let software = req.headers["user-agent"];
  res.json({ipaddress: ipaddress,
   "language": language,
   "software":software});
});

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
