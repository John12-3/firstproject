// node firstJSONread.js --src=teams.json

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

fs.readFile(args.src, "utf-8", function (err, json) {
	if (err) {
		console.log("Tumsa na ho Payega " + err);
	} else {
		let teams = JSON.parse(json); // Converting JSON to JSO so that you can Manipulate the data
		console.log(teams[2].match[1].vs);
	}
});

// JSO
// If you want to print or Save a JSO, converting the JSO to JSON using JSON.stringify()

// If you want to Manipulate a JSON, Convert the JSON to JSO using JSON.parse()
