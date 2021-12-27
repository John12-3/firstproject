// to get the information and extract the details of the worldcup 2019 from cricinfo and then store it in the form of excel and then pdf scorecards
// The real purpose is to learn how to extract information and get the experience with js

// npm init
// npm install minimist
// npm install axios
// npm install jsdom
// npm install excel4node
// npm install pdf-lib

// node project1.js --src="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --excel=Worldcup.csv --dataFolder=data

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel = require("excel4node");
let pdf = require("pdf-lib");
let fs = require("fs");
const { match } = require("assert");
let path = require("path");
// const { match } = require("assert");

let args = minimist(process.argv);
// console.log(args.src);
// console.log(args.excel);
// console.log(args.dataFolder);

// download using axios
// read using jsdom
// make excel using excel4node
// make pdf using pdf-lib

let responseKapromise = axios.get(args.src);
responseKapromise
	.then(function (response) {
		let html = response.data;
		// console.log(html);
		let dom = new jsdom.JSDOM(html);
		let document = dom.window.document;
		// let title = document.title;
		// console.log(title);

		let matches = [];
		let matchInfoDivs = document.querySelectorAll("div.match-score-block");
		// console.log(matchInfoDivs.length);

		for (let i = 0; i < matchInfoDivs.length; i++) {
			let match = {
				t1: "",
				t2: "",
				t1s: "",
				t2s: "",
				result: "",
			};

			let names = matchInfoDivs[i].querySelectorAll("p.name");
			let scoreSpan = matchInfoDivs[i].querySelectorAll(
				"div.score-detail > span.score"
			);
			// match.t1s = "";
			// match.t2s = "";
			if (scoreSpan.length === 2) {
				match.t1s = scoreSpan[0].textContent;
				match.t2s = scoreSpan[1].textContent;
			} else if (scoreSpan.length === 1) {
				match.t1s = scoreSpan[0].textContent;
				match.t2s = "";
			} else {
				match.t1s = "";
				match.t2s = "";
			}
			let resultdiv = matchInfoDivs[i].querySelector("div.status-text > span");
			// console.log(names[0].textContent);
			// console.log(names[1].textContent);
			match.t1 = names[0].textContent;
			match.t2 = names[1].textContent;
			match.result = resultdiv.textContent;
			matches.push(match);
		}
		// console.log(matches);
		let teams = [];
		for (let i = 0; i < matches.length; i++) {
			putTeamsintTeamsArrayIfMissing(teams, matches[i]);
		}
		for (let i = 0; i < matches.length; i++) {
			putMatchInAppropriateTeam(teams, matches[i]);
		}
		// console.log(JSON.stringify(teams));
		//todo -> we need to convert the JSO to JSON we need to convert it we use stringify
		let teamsjson = JSON.stringify(teams);
		fs.writeFileSync("teams.json", teamsjson, "utf-8");

		// Create Excel file
		createExcelFile(teams);
		createFolders(teams);
	})
	.catch(function (err) {
		console.log(err);
	});

function createFolders(teams) {
	fs.mkdirSync(args.dataFolder);
	for (let i = 0; i < teams.length; i++) {
		let teamFolder = path.join(args.dataFolder, teams[i].name);
		fs.mkdirSync(teamFolder);

		for (let j = 0; j < teams[i].matches.length; j++) {
			let teamFileName = path.join(teamFolder, teams[i].matches[j].vs + ".pdf");
			createScorcard(teams[i].name, teams[i].matches[j], teamFileName);
		}
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
	let t1s = match.selfscore;
	let t2s = match.oppscore;
	let result = match.result;
	let originalBytes = fs.readFileSync("template.pdf");
	// here we need to load the contents but it will be in the byte format
	let PromiseToLoadDoc = pdf.PDFDocument.load(originalBytes);
	PromiseToLoadDoc.then(function (pdfdoc) {
		let page = pdfdoc.getPage(0);
		page.drawText(t1, {
			x: 330,
			y: 670,
			size: 20,
		});
		page.drawText(t2, {
			x: 330,
			y: 640,
			size: 20,
		});
		page.drawText(t1s, {
			x: 330,
			y: 610,
			size: 20,
		});
		page.drawText(t2s, {
			x: 330,
			y: 580,
			size: 20,
		});
		page.drawText(result, {
			x: 330,
			y: 550,
			size: 16,
		});
		let promisetoSave = pdfdoc.save(); //  here in this statement it promises us it will return a byte
		promisetoSave.then(function (changedBytes) {
			// here its a changed Bytes has we draw Text so we need to print it in the document
			fs.writeFileSync(matchfilename, changedBytes);
		});
	});
}

function putTeamsintTeamsArrayIfMissing(teams, match) {
	// finding the index first
	let t1Idx = -1;
	for (let i = 0; i < teams.length; i++) {
		if (teams[i].name === match.t1) {
			t1Idx = i;
			break;
		}
	}
	if (t1Idx == -1) {
		let team = {
			name: match.t1,
			matches: [],
		};
		teams.push(team);
	}

	let t2Idx = -1;
	for (let i = 0; i < teams.length; i++) {
		if (teams[i].name === match.t2) {
			t2Idx = i;
			break;
		}
	}
	if (t2Idx === -1) {
		teams.push({
			name: match.t2,
			matches: [],
		});
	}
}

function putMatchInAppropriateTeam(teams, match) {
	let t1Idx = -1;
	for (let i = 0; i < teams.length; i++) {
		if (teams[i].name === match.t1) {
			t1Idx = i;
			break;
		}
	}
	// teams[t1Idx] will give which team is that and that team we give it to team1
	// and team1 pushes it in the matches
	let team1 = teams[t1Idx];
	team1.matches.push({
		vs: match.t2,
		selfscore: match.t1s,
		oppscore: match.t2s,
		result: match.result,
	});

	let t2Idx = -1;
	for (let i = 0; i < teams.length; i++) {
		if (teams[i].name === match.t2) {
			t2Idx = i;
			break;
		}
	}
	let team2 = teams[t2Idx];
	team2.matches.push({
		vs: match.t1,
		selfscore: match.t2s,
		oppscore: match.t1s,
		result: match.result,
	});
	// let t1idx = -1;
	// for(let i=0;i<teams.length;i++)
	// {
	// 	if(teams[i].name === match.t1)
	// 	{
	// 		t1idx = i;
	// 		break;
	// 	}
	// }
	// let team1 = teams[t1idx];
	// team1.matches.push({
	// 	vs:match.t1,
	// 	selfscore:match.t1s,
	// 	oppscore:match.t2s,
	// 	result:match.result
	// })
}

function createExcelFile(teams) {
	let wb = new excel.Workbook();

	for (let i = 0; i < teams.length; i++) {
		let sheet = wb.addWorksheet(teams[i].name);
		sheet.cell(1, 1).string("VS");
		sheet.cell(1, 2).string("Self Score");
		sheet.cell(1, 3).string("Opponent Score");
		sheet.cell(1, 4).string("Result");

		for (let j = 0; j < teams[i].matches.length; j++) {
			sheet.cell(j + 2, 1).string(teams[i].matches[j].vs);
			sheet.cell(j + 2, 2).string(teams[i].matches[j].selfscore);
			sheet.cell(j + 2, 3).string(teams[i].matches[j].oppscore);
			sheet.cell(j + 2, 4).string(teams[i].matches[j].result);
		}
	}
	wb.write(args.excel);
}
