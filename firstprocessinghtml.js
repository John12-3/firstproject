// first processing with the html file we have it
// node firstprocessinghtml.js --src=download.html

let minimist = require("minimist");
let fs = require("fs");
let jsdom = require("jsdom");
// will load html and prepare the dom for the programmer just like a browser would have

let args = minimist(process.argv);
// console.log(args.src);

fs.readFile(args.src, "utf-8", function (error, html) {
	let dom = new jsdom.JSDOM(html);
	let document = dom.window.document;

	// we will get all div's with call description whose parent is a div with class match-info
	let description = document.querySelectorAll(
		"div.match-info > div.description"
	);
	for (let i = 0; i < description.length; i++) {
		console.log(description[i].textContent);
	}
});
