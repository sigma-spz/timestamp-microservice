// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res)=> {
    
    const validDateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^\d{13}$/m;

    const enteredDate = req.params.date;
    console.log({ input: req.params.date, type: typeof(req.params.date)} );
    
    if (typeof(enteredDate) === "undefined" || enteredDate.match(/\s+/) ) {
	
	const currentDate = new Date().toUTCString();
	res.json({ unix: Date.parse(currentDate), utc: currentDate})
    } else if (enteredDate.match(validDateFormat)) {
	
	const parsedDate = new Date(enteredDate).toString() === "Invalid Date"
	      ? new Date( parseInt(enteredDate) ).toUTCString()
	      : new Date(enteredDate).toUTCString();
	const unixDate = Date.parse(parsedDate);
	console.log({ parsedDate: parsedDate});
	res.json({unix: unixDate, utc: parsedDate});
    } else {
	
	res.json( {error: "Invalid Date"});
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
