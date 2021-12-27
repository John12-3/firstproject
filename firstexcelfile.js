// node firstexcelfile.js --src=teams.json --dest=teams.csv
// npm install excel4node

let minimist = require("minimist");
let fs = require("fs");
let excel = require("excel4node");

let args = minimist(process.argv);

// console.log(args.src);
// console.log(args.dest);

let teamsJSON = fs.readFileSync(args.src, "utf-8");
let teams = JSON.parse(teamsJSON); // converting JSON to JSO to manipulate with the data
// console.log(teams[0].match[1].vs);

// Create a new instance of a Workbook class
// var wb = new xl.Workbook();

// Add Worksheets to the workbook
// var ws = wb.addWorksheet('Sheet 1');
// var ws2 = wb.addWorksheet('Sheet 2');

// let workbook = new excel.Workbook(); // the WorkBook is made of Excel Sheet

// // Create a reusable style
// let hsstyle = workbook.createStyle({
// 	font: {
// 		color: "red",
// 	},
// 	fill: {
// 		type: "pattern",
// 		patternType: "solid",
// 		fgColor: "yellow",
// 	},
// });

// for (let i = 0; i < teams.length; i++) {
// 	let sheet = workbook.addWorksheet(teams[i].name);
// 	sheet.cell(1, 1).string("Opponent").style(hsstyle);
// 	sheet.cell(1, 2).string("Result").style(hsstyle);
// 	sheet.cell(1, 4).string("Rank").style(hsstyle);
// 	sheet.cell(1, 5).number(teams[i].rank);
// 	for (let j = 0; j < teams[i].match.length; j++) {
// 		let vs = teams[i].match[j].vs;
// 		let result = teams[i].match[j].result;

// 		sheet.cell(2 + j, 1).string(vs);
// 		sheet.cell(2 + j, 2).string(result);
// 	}
// }

// // To sabe everything in the workbook
// workbook.write(args.dest);

// Todo -> again
// Making workSheet
let workbook = new excel.Workbook();

// Creating Styling

let hsstyle = workbook.createStyle({
	font: {
		Bold: true,
		size: 15,
		color: "red",
	},
	fill: {
		type: "pattern",
		patternType: "solid",
		fgColor: "yellow",
	},
});

// Adding the Seperate Worksheet
for (let i = 0; i < teams.length; i++) {
	let sheet = workbook.addWorksheet(teams[i].name);
	sheet.cell(1, 1).string("Opponent").style(hsstyle);
	sheet.cell(1, 2).string("Result").style(hsstyle);
	sheet.cell(1, 4).string("Rank").style(hsstyle);
	sheet.cell(1, 5).number(teams[i].rank);

	// now we need to fetch the result and the oppenents details
	for (let j = 0; j < teams[i].match.length; j++) {
		sheet.cell(2 + j, 1).string(teams[i].match[j].vs);
		sheet.cell(2 + j, 2).string(teams[i].match[j].result);
	}
}

workbook.write(args.dest);
