// download html using axios
// extract information using jsdom
// convert matches to teams
// save teams to excel using excel4node
// create folders and save pdf using pdf-lib

//npm init -y
// npm install minimist
// npm install axios
// npm install jsdom
// npm install excel4node
// npm install pdf-lib

// node cricinfoextracter.js --src="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"     --datafolder=Worldcup  --excel=worldcup.csv

let minimist = require("minimist");
let axios = require("axios");
let pdf = require("pdf-lib");
let excel = require("excel4node");
let fs = require("fs");
let path = require("path");
let jsdom = require("jsdom");
const { match } = require("assert");

let args = minimist(process.argv);
// console.log(args.excel);

// browser => url to html (Request to response)
let RespnseKaPromise = axios.get(args.src);
RespnseKaPromise.then(function (response) {
	let html = response.data;
	// console.log(html);

	let dom = new jsdom.JSDOM(html);
	let document = dom.window.document;
	// console.log(document.title);

	let matchScoreDiv = document.querySelectorAll("div.match-score-block");
	// console.log(matchScoreDiv.length);
	let matches = [];

	for (let i = 0; i < matchScoreDiv.length; i++) {
		let match = {
			t1: "",
			t2: "",
			t1s: "",
			t2s: "",
			result: "",
		};
		// let names = matchInfoDivs[i].querySelectorAll("p.name");
		// let scoreSpan = matchInfoDivs[i].querySelectorAll(
		// 	"div.score-detail > span.score"
		// );
		let teamParas = matchScoreDiv[i].querySelectorAll(
			"div.name-detail > p.name"
		);
		match.t1 = teamParas[0].textContent;
		match.t2 = teamParas[1].textContent;
		let scoreSpans = matchScoreDiv[i].querySelectorAll(
			"div.score-detail > span.score"
		);

		if (scoreSpans.length === 2) {
			match.t1s = scoreSpans[0].textContent;
			match.t2s = scoreSpans[1].textContent;
		} else if (scoreSpans.length === 1) {
			match.t1s = scoreSpans[0].textContent;
		} else {
			match.t1s = "";
			match.t2s = "";
		}

		let resultspan = matchScoreDiv[i].querySelector("div.status-text > span");
		match.result = resultspan.textContent;
		// console.log(match.result);
		matches.push(match);
	}
	// console.log(matches);

	let matchesKaJson = JSON.stringify(matches);
	fs.writeFileSync("matches.json", matchesKaJson, "utf-8");

	let teams = []; // creating a array

	// push team in teams, if not already there
	for (let i = 0; i < matches.length; i++) {
		pushTeamsinTeamsArrayIfNotThere(teams, matches[i].t1);
		pushTeamsinTeamsArrayIfNotThere(teams, matches[i].t2);
	}

	// push match at appropriate place
	for (let i = 0; i < matches.length; i++) {
		pushMatchInAppropriateTeam(
			teams,
			matches[i].t1,
			matches[i].t2,
			matches[i].t1s,
			matches[i].t2s,
			matches[i].result
		);
		pushMatchInAppropriateTeam(
			teams,
			matches[i].t2,
			matches[i].t1,
			matches[i].t2s,
			matches[i].t1s,
			matches[i].result
		);
	}

	let teamsKaJson = JSON.stringify(teams);
	fs.writeFileSync("teams.json", teamsKaJson, "utf-8");

	prepareExcel(teams, args.excel);

	prepareFolderAndPdfs(teams, args.datafolder);
});

function prepareFolderAndPdfs(teams, datadir) {
	if (fs.existsSync(datadir) === false) {
		fs.mkdirSync(datadir);
	}
	for (let i = 0; i < teams.length; i++) {
		let teamFolderName = path.join(datadir, teams[i].name);
		if (fs.existsSync(teamFolderName) === false) {
			fs.mkdirSync(teamFolderName);
		}
		for (let j = 0; j < teams[i].matches.length; j++) {
			let match = teams[i].matches[j];
			createMatchScoreCardPdf(teamFolderName, match, teams[i].name);
		}
	}
}

function createMatchScoreCardPdf(teamfoldername, match, hometeamname) {
	let matchfileName = path.join(teamfoldername, match.vs + ".pdf");
	let templateFileBytes = fs.readFileSync("Template.pdf");
	let pdfDocKapromise = pdf.PDFDocument.load(templateFileBytes);
	pdfDocKapromise.then(function (pdfdoc) {
		let page = pdfdoc.getPage(0);

		page.drawText(hometeamname, {
			x: 330,
			y: 670,
			size: 20,
		});
		page.drawText(match.vs, {
			x: 330,
			y: 640,
			size: 20,
		});
		page.drawText(match.selfScore, {
			x: 330,
			y: 610,
			size: 20,
		});
		page.drawText(match.oppScore, {
			x: 330,
			y: 580,
			size: 20,
		});
		page.drawText(match.result, {
			x: 330,
			y: 550,
			size: 16,
		});
		let changedBytesKaPromise = pdfdoc.save(); //  here in this statement it promises us it will return a byte
		changedBytesKaPromise.then(function (chnagedBytes) {
			if (fs.existsSync(matchfileName + ".pdf") === true) {
				fs.writeFileSync(matchfileName + "1.pdf", chnagedBytes);
			} else {
				fs.writeFileSync(matchfileName + ".pdf", chnagedBytes);
			}
		});
	});
}

function prepareExcel(teams, excelfileName) {
	let wb = new excel.Workbook();

	for (let i = 0; i < teams.length; i++) {
		let sheet = wb.addWorksheet(teams[i].name);
		sheet.cell(1, 1).string("VS");
		sheet.cell(1, 2).string("Self Score");
		sheet.cell(1, 3).string("Opponent Score");
		sheet.cell(1, 4).string("Result");
		for (let j = 0; j < teams[i].matches.length; j++) {
			sheet.cell(2 + j, 1).string(teams[i].matches[j].vs);
			sheet.cell(2 + j, 2).string(teams[i].matches[j].selfScore);
			sheet.cell(2 + j, 3).string(teams[i].matches[j].oppScore);
			sheet.cell(2 + j, 4).string(teams[i].matches[j].result);
		}
	}
	wb.write(args.excel);
}

function pushMatchInAppropriateTeam(
	teams,
	homeTeam,
	oppteam,
	homescore,
	oppscore,
	result
) {
	let t1idx = -1;
	for (let j = 0; j < teams.length; j++) {
		if (teams[j].name === homeTeam) {
			t1idx = j;
		}
	}

	let team = teams[t1idx];
	team.matches.push({
		vs: oppteam,
		selfScore: homescore,
		oppScore: oppscore,
		result: result,
	});
}
function pushTeamsinTeamsArrayIfNotThere(teams, teamname) {
	let t1idx = -1;
	for (let j = 0; j < teams.length; j++) {
		if (teams[j].name === teamname) {
			t1idx = j;
		}
	}
	if (t1idx === -1) {
		let team = {
			name: teamname,
			matches: [],
		};
		teams.push(team);
	}
}
