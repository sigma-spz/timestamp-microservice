
const DateParser = (req, res) => {

    try {
	console.log({rawInput: req.params.date})
	const enteredDate = req.params.date
	      ? req.params.date.match(/^\d{13}$/m)
	      ? parseInt(req.params.date)
	      : req.params.date
	      : "  ";
	const parsedDate = new String(enteredDate).match(/^\s+$/m)
	      ? new Date().toUTCString()
	      : new Date(enteredDate).toUTCString();
	console.log({enteredDate: enteredDate, parsedDate: parsedDate});
	if (parsedDate === "Invalid Date") {
	    throw "Invalid Date"
	} 
	res.json( {unix: Date.parse(parsedDate), utc: parsedDate} );
    } catch (e) {
	console.log(e)
	res.json( {error: e} );
    }
}

exports.DateParser = DateParser;

