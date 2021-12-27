// npm install pdf-lib

// node firstwritingpdf.js --src=teams.json --dest=worldcup

let minimist = require("minimist");
let fs = require("fs");
let path = require("path");
let pdf = require("pdf-lib");

let args = minimist(process.argv);
// console.log(args.src);

// we need to convert json to jso
let teamsJSON = fs.readFileSync(args.src, "utf-8");
let teams = JSON.parse(teamsJSON);

fs.mkdirSync(args.dest); // making the main folder called worlcup

for (let i = 0; i < teams.length; i++) {
	let teamfolder = path.join(args.dest, teams[i].name); // each Country will have a different folder in the main folder
	fs.mkdirSync(teamfolder);
	for (let j = 0; j < teams[i].match.length; j++) {
		let matchfileName = path.join(teamfolder, teams[i].match[j].vs + ".pdf");
		// console.log(teamspdfpath);
		createScorcard(teams[i].name, teams[i].match[j], matchfileName);
	}
}

function createScorcard(teamName, match, matchfilename) {
	// todo -> this function creates pdf for match in appropriate folder with correct details
	// todo -> here we will use pdf-lib to create the pdf
	// console.log(teamName);
	// console.log(match.vs);
	// console.log(match.result);
	// console.log(matchfilename);
	// console.log("-----------------------------");
	let t1 = teamName;
	let t2 = match.vs;
	let result = t1 + " " + match.result;
	let originalBytes = fs.readFileSync("template.pdf");
	// here we need to load the contents but it will be in the byte format
	let PromiseToLoadDoc = pdf.PDFDocument.load(originalBytes);
	PromiseToLoadDoc.then(function (pdfdoc) {
		let page = pdfdoc.getPage(0);
		page.drawText(t1, {
			x: 320,
			y: 718,
			size: 10,
		});
		page.drawText(t2, {
			x: 320,
			y: 703,
			size: 10,
		});
		page.drawText(result, {
			x: 320,
			y: 690,
			size: 10,
		});
		let promisetoSave = pdfdoc.save(); //  here in this statement it promises us it will return a byte
		promisetoSave.then(function (changedBytes) {
			// here its a changed Bytes has we draw Text so we need to print it in the document
			fs.writeFileSync(matchfilename, changedBytes);
		});
	});
	// let t1 = teamName;
	// let t2 = match.vs;
	// let result = t1 + " " + match.result;

	// let orininalBytes = fs.readFileSync("template.pdf"); // Bytes mile hai
	// let promisepdftodoc = pdf.PDFDocument.load(orininalBytes); // it will load the bytes ka doc but it gives a prmoise
	// promisepdftodoc.then(function (pdfdoc) {
	// 	let page = pdfdoc.getPage(0);
	// 	page.drawText("Hello World");

	// 	let promisetosavedoc = pdfdoc.save();
	// 	promisetosavedoc.then(function (changedBytes) {
	// 		fs.writeFileSync(matchfilename, changedBytes);
	// 	});
	// });
}
