// node firstTimer.js --n=10 --d=500

let minimist = require("minimist");
let args = minimist(process.argv);

let count = args.n;

let id = setInterval(function () {
	console.log(count + " time-units to go ");
	count--;

	if (count == 0) {
		clearInterval(id); // it will clear the interval else it will go to -1
		console.log("Timeout");
	}
}, args.d);
