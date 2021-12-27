// Making a big file which will be more 1 GB

// node firstbigfile.js --des=big.data

let minimist = require("minimist");
let fs = require("fs");

let args = minimist(process.argv);

let arr = []; // initilising the arr

for (let i = 0; i < 50000000; i++) {
	arr.push(i); // pushing the elements in the array
}
// now making it has the string
let str = arr.join("\n");
fs.writeFileSync(args.des, str, "utf-8");
