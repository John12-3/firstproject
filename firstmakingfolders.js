// node firstmakingfolders.js --src=teams.json --dest=root

let minimist = require("minimist");
let fs = require("fs");

let jsdom = require("jsdom");
// let excel4node = require("excel4node");
let path = require("path");

let args = minimist(process.argv);
console.log(args.src);
console.log(args.dest);

let teams_JSDOM = fs.readFileSync(args.src, "utf-8"); // JSON file will be there
// we need to parse it
let teams = JSON.parse(teams_JSDOM); // now we converted fro JSON to JSO so that we can manipulated from the data

for (let i = 0; i < teams.length; i++) {
	let foldername = path.join(args.dest, teams[i].name);
	console.log(foldername);
	fs.mkdirSync(foldername);
}
