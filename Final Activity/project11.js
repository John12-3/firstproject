// to get the information and extract the details of the worldcup 2019 from cricinfo and then store it in the form of excel and then pdf scorecards
// The real purpose is to learn how to extract information and get the experience with js

// npm init
// npm install minimist
// npm install axios
// npm install jsdom
// npm install excel4node
// npm install pdf-lib

// node project11.js --src="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results" --excel=Worldcup.csv --dataFolder=data

// todo -> Download using axios
// todo -> Extract information using jsdom
// todo -> Manipulate data using array functions
// todo -> Save in excel using excel4node

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let pdf = require("pdf-lib");
let excel = require("excel4node");
let fs = require("fs");
const { match } = require("assert");

let args = minimist(process.argv);

let responsefromwebKaPromise = axios.get(args.src);
responsefromwebKaPromise
	.then(function (response) {
		let html = response.data;
		// console.log(html);

		let dom = new jsdom.JSDOM(html);
		// console.log(dom);
		let document = dom.window.document;
		// console.log(document.title);

		let matches = []; // Initialise the Array of matches
		let alldivsmatches = document.querySelectorAll("div.match-score-block");
		for (let i = 0; i < alldivsmatches.length; i++) {
			// make a object and then push that object in that matches array
			let match = {};

			// names of all the teams played
			let names = alldivsmatches[i].querySelectorAll(
				"div.name-detail > p.name"
			);

			match.t1name = names[0].textContent;
			match.t2name = names[1].textContent;

			// now we need to print he score of t1 and t2
			let scores = alldivsmatches[i].querySelectorAll(
				"div.score-detail > span.score"
			);
			if (scores.length === 2) {
				match.t1s = scores[0].textContent;
				match.t2s = scores[1].textContent;
			} else if (scores.length === 1) {
				match.t1s = scores[0].textContent;
				match.t2s = "";
			} else {
				match.t1s = "";
				match.t2s = "";
			}

			//now we need for result storage
			let result = alldivsmatches[i].querySelector("div.status-text > span");
			match.result = result.textContent;

			matches.push(match);
		}
		// console.log(matches);
		let teams = [];
		for (let i = 0; i < matches.length; i++) {
			PopulateTeams(teams, matches[i]); // matches is a array , teams is also an Array but the macth is aan object
		}
		console.log(teams);
	})
	.catch(function (err) {
		console.log(err);
	});

function PopulateTeams(teams, match) {
	let t1idx = teams.findIndex(function (team) {
		if (team.name === match.t1name) {
			return true;
		} else {
			return false;
		}
	});
	if (t1idx === -1) {
		let team = {
			name: match.t1name,
			matches: [],
		};
		teams.push(team);
	}

	let t2idx = teams.findIndex(function (team) {
		if (team.name === match.t2name) {
			return true;
		} else {
			return false;
		}
	});
	if (t2idx === -1) {
		let team = {
			name: match.t2name,
			matches: [],
		};
		teams.push(team);
	}
}

function populateMatchesInTeams(teams, match) {}
