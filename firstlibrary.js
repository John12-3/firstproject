// npm install minimist

let parser = require("minimist");
let args = parser(process.argv);
// console.log(args);

// node firstlibrary.js -x 4 -y 10
// x: 4,
// y:10

// node firstlibrary.js --name="JOHN STEPHEN" --age=34
let name = args.name;
let age = args.age;

if (age > 25) {
	console.log("Hello " + name + " , You must go Home ! ");
} else {
	console.log("Heyaa " + name + " . Come for the party");
}
