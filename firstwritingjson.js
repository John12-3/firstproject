// Writing the first JSON
// node firstwritingjson.js --des=teams.json

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

let teams = [
	{
		team: "India",
		rank: 1,
		match: [
			{
				vs: "England",
				result: "Won",
			},
			{
				vs: "Australia",
				result: "Won",
			},
		],
	},
	{
		team: "Australia",
		rank: 2,
		match: [
			{
				vs: "India",
				result: "Lost",
			},
			{
				vs: "England",
				result: "Won",
			},
		],
	},
	{
		team: "England",
		rank: 3,
		match: [
			{
				vs: "India",
				result: "Lost",
			},
			{
				vs: "Austalia",
				result: "Lost",
			},
		],
	},
];

let json = JSON.stringify(teams); // !Converting Javascript Object to javaScript Object Notation
//todo ->  JavaSript Object cant be printed or Saved it has to converted to JSON.stringify() so that it can be printed or saved
fs.writeFileSync(args.des, json, "utf-8");
console.log(teams[2].match[1].vs);
